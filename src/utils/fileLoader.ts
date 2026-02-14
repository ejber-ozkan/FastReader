import ePub from 'epubjs';

export async function parseFile(file: File): Promise<{ title: string; words: string[]; chapters: { title: string; index: number }[] }> {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        return parseTxt(file);
    } else {
        return parseEpub(file);
    }
}

async function parseTxt(file: File): Promise<{ title: string; words: string[]; chapters: { title: string; index: number }[] }> {
    const text = await file.text();
    const title = file.name.replace(".txt", "");
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const words = cleanText.split(' ');
    return { title, words, chapters: [{ title: "Start", index: 0 }] };
}

async function parseEpub(file: File): Promise<{ title: string; words: string[]; chapters: { title: string; index: number }[] }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                if (!e.target?.result) throw new Error("Failed to read file");

                console.log("ArrayBuffer loaded, initializing ePub...");
                const book = ePub(e.target.result as ArrayBuffer);

                // Wait for spine specifically
                console.log("Waiting for spine...");
                await book.loaded.spine;
                console.log("Spine loaded.");

                const metadata = await book.loaded.metadata;
                console.log("Metadata loaded:", metadata);
                const title = metadata.title || file.name;

                const spine = book.spine;

                // @ts-ignore
                const spineItems = spine.items || [];

                if (spineItems.length === 0) {
                    // @ts-ignore
                    const sections = book.sections; // internal api
                    // If no spine items, we might need a fallback, but let's proceed with empty check below
                }

                // Parallelize chapter processing
                const chapterPromises = spineItems.map(async (_: any, i: number) => {
                    // Use spine.get(i) to ensure we get the Section object
                    // @ts-ignore
                    const section = spine.get(i);
                    // Fallback to raw item if get fails?
                    const rawItem = spineItems[i];

                    let doc: any;
                    try {
                        // Load the document/content
                        if (section && typeof section.load === 'function') {
                            // @ts-ignore
                            doc = await section.load(book.load.bind(book));
                        } else if (section && section.href) {
                            doc = await book.load(section.href);
                        } else if (rawItem && rawItem.href) {
                            doc = await book.load(rawItem.href);
                        } else {
                            return ""; // Skip
                        }

                        // Helper to strip tags from string if we have a string source
                        const aggressiveStrip = (html: string) => {
                            return html
                                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                                .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, ''); // Head usually contains styles
                        };

                        // 1. Serialize everything to string.
                        let rawHtml = "";
                        if (typeof doc === 'string') {
                            rawHtml = doc;
                        } else if (doc instanceof Document) {
                            rawHtml = new XMLSerializer().serializeToString(doc);
                        } else if (doc && typeof doc === 'object') {
                            // Fallback for generic objects
                            if (doc.documentElement) {
                                rawHtml = doc.documentElement.outerHTML || new XMLSerializer().serializeToString(doc);
                            } else {
                                // Last ditch: try to see if it has innerHTML or just text
                                rawHtml = doc.innerHTML || doc.textContent || "";
                            }
                        }

                        if (!rawHtml || rawHtml.trim().length === 0) {
                            return "";
                        }

                        // 2. Aggressive Regex Strip
                        const cleanedHtml = aggressiveStrip(rawHtml);

                        // 3. Parse into a FRESH HTML Document
                        const parser = new DOMParser();
                        const cleanDoc = parser.parseFromString(cleanedHtml, "text/html");

                        // 4. Secondary DOM Clean (Cleanup artifacts and verify)
                        const toRemove = cleanDoc.querySelectorAll('script, style, link, svg, noscript, meta, head, title');
                        toRemove.forEach(el => el.remove());

                        // 5. Extract Text
                        const root = cleanDoc.body || cleanDoc.documentElement;
                        let textContent = (root as HTMLElement).innerText || root.textContent || "";

                        // Clean whitespace
                        textContent = textContent.replace(/\s+/g, ' ').trim();

                        return textContent.length > 0 ? textContent : "";

                    } catch (err: any) {
                        console.error(`Error processing chapter ${i}:`, err);
                        return "";
                    }
                });

                const chapterTexts = await Promise.all(chapterPromises);

                // Process chapters to get indices
                const chapters: { title: string; index: number }[] = [];
                const allWords: string[] = [];
                let runningWordCount = 0;

                for (let i = 0; i < chapterTexts.length; i++) {
                    const raw = chapterTexts[i];
                    if (!raw || raw.trim().length === 0) continue;

                    const cleanWords = raw.trim().split(/\s+/);
                    if (cleanWords.length === 0 || (cleanWords.length === 1 && cleanWords[0] === '')) continue;

                    // Try to get title from TOC/Spine if possible, or just default
                    const chapterTitle = `Chapter ${chapters.length + 1}`;

                    chapters.push({ title: chapterTitle, index: runningWordCount });
                    allWords.push(...cleanWords);
                    runningWordCount += cleanWords.length;
                }

                if (allWords.length === 0) {
                    throw new Error("No text content found in EPUB.");
                }

                resolve({ title, words: allWords, chapters });

            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
