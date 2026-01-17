import ePub from 'epubjs';

export async function parseFile(file: File): Promise<{ title: string; words: string[] }> {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        return parseTxt(file);
    } else {
        return parseEpub(file);
    }
}

async function parseTxt(file: File): Promise<{ title: string; words: string[] }> {
    const text = await file.text();
    const title = file.name.replace(".txt", "");
    const cleanText = text.replace(/\s+/g, ' ').trim();
    return { title, words: cleanText.split(' ') };
}

async function parseEpub(file: File): Promise<{ title: string; words: string[] }> {
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
                let fullText = "";
                let debugTrace = [`Title: ${title}`];

                // @ts-ignore
                const spineItems = spine.items || [];
                debugTrace.push(`Spine items: ${spineItems.length}`);

                if (spineItems.length === 0) {
                    // Try getting keys if items is empty?
                    // @ts-ignore
                    const sections = book.sections; // internal api
                    if (sections) debugTrace.push(`Sections found: ${sections.length}`);
                }

                for (let i = 0; i < spineItems.length; i++) {
                    // Use spine.get(i) to ensure we get the Section object
                    // @ts-ignore
                    const item = spine.get(i);
                    // Fallback to raw item if get fails?
                    const rawItem = spineItems[i];

                    try {
                        let doc: any;

                        // Load the document/content
                        if (item && typeof item.load === 'function') {
                            // @ts-ignore
                            doc = await item.load(book.load.bind(book));
                        } else if (item && item.href) {
                            debugTrace.push(`Item ${i}: load() missing, using book.load(href)`);
                            doc = await book.load(item.href);
                        } else if (rawItem && rawItem.href) {
                            debugTrace.push(`Item ${i}: using rawItem.href fallback`);
                            doc = await book.load(rawItem.href);
                        } else {
                            continue;
                        }

                        // Helper to strip tags from string if we have a string source
                        const aggressiveStrip = (html: string) => {
                            return html
                                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                                .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, ''); // Head usually contains styles
                        };

                        // 1. Serialize everything to string.
                        // This ensures we can use Regex to strip bad tags regardless of input type (Document, XML, Object)
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
                            if (i < 5) debugTrace.push(`Item ${i}: Empty content after serialize`);
                            continue;
                        }

                        // 2. Aggressive Regex Strip
                        // This is the primary defense against CSS appearing as text
                        const cleanedHtml = aggressiveStrip(rawHtml);

                        // 3. Parse into a FRESH HTML Document
                        // We use text/html to ensure standard DOM behavior (not strict XML)
                        const parser = new DOMParser();
                        const cleanDoc = parser.parseFromString(cleanedHtml, "text/html");

                        // 4. Secondary DOM Clean (Cleanup artifacts and verify)
                        const toRemove = cleanDoc.querySelectorAll('script, style, link, svg, noscript, meta, head, title');
                        toRemove.forEach(el => el.remove());

                        // 5. Extract Text
                        // Prefer body, fallback to documentElement
                        const root = cleanDoc.body || cleanDoc.documentElement;
                        // Use innerText (if available) as it's smarter about hidden/style elements
                        // Fallback to textContent which just dumps all text of children
                        let textContent = (root as HTMLElement).innerText || root.textContent || "";

                        // Clean whitespace
                        textContent = textContent.replace(/\s+/g, ' ').trim();

                        if (textContent.length > 0) {
                            fullText += " " + textContent;
                            if (i < 3) debugTrace.push(`Item ${i}: Extracted ${textContent.length} chars`);
                        } else {
                            if (i < 5) debugTrace.push(`Item ${i}: No text content extracted.`);
                        }

                    } catch (chapErr: any) {
                        debugTrace.push(`Item ${i} Error: ${chapErr.message || chapErr}`);
                    }
                }

                const cleanText = fullText.replace(/\s+/g, ' ').trim();
                debugTrace.push(`Total extracted: ${cleanText.length} chars`);

                if (cleanText.length === 0) {
                    throw new Error("No text content found in EPUB. Debug Trace:\n" + debugTrace.join('\n'));
                }

                const words = cleanText.split(' ');
                resolve({ title, words });

            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
