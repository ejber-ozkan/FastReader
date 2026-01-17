import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface FastReaderDB extends DBSchema {
    books: {
        key: string;
        value: {
            id: string; // unique ID (hash or name+size)
            title: string;
            data: Blob; // The full file content
            type: 'epub' | 'txt' | 'text/plain'; // Explicitly allow text/plain
            progress: number; // 0-100
            lastRead: number; // timestamp
            totalWords?: number;
        };
        indexes: { 'by-date': number };
    };
}

let dbPromise: Promise<IDBPDatabase<FastReaderDB>>;

export const initDB = () => {
    if (!dbPromise) {
        dbPromise = openDB<FastReaderDB>('FastReaderDB', 1, {
            upgrade(db) {
                const store = db.createObjectStore('books', { keyPath: 'id' });
                store.createIndex('by-date', 'lastRead');
            },
        });
    }
    return dbPromise;
};

export const saveBook = async (file: File, title: string, totalWords: number) => {
    const db = await initDB();
    const id = await generateFileId(file);

    // Check if exists to preserve progress
    const existing = await db.get('books', id);

    await db.put('books', {
        id,
        title,
        data: file,
        type: file.type as 'epub' | 'txt' | 'text/plain',
        progress: existing ? existing.progress : 0,
        lastRead: Date.now(),
        totalWords
    });

    return { id, progress: existing ? existing.progress : 0 };
};

export const updateProgress = async (id: string, progress: number) => {
    const db = await initDB();
    const book = await db.get('books', id);
    if (book) {
        book.progress = progress;
        book.lastRead = Date.now();
        await db.put('books', book);
    }
};

export const getRecentBooks = async () => {
    const db = await initDB();
    return db.getAllFromIndex('books', 'by-date');
};

export const getBook = async (id: string) => {
    const db = await initDB();
    return db.get('books', id);
};

// Helper: Simple hash for ID
const generateFileId = async (file: File): Promise<string> => {
    const msg = `${file.name}-${file.size}-${file.lastModified}`;

    // Check if crypto.subtle is available (Secure Context)
    if (crypto && crypto.subtle) {
        try {
            const msgBuffer = new TextEncoder().encode(msg);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn("Crypto API failed, falling back to simple hash", e);
        }
    }

    // Fallback URL-safe base64 of the string (not a real hash but unique enough for local)
    // Or a simple djb2 variant if we want shorter
    let hash = 0;
    for (let i = 0; i < msg.length; i++) {
        const char = msg.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
};
