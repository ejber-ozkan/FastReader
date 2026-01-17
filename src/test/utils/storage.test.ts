import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveBook, updateProgress, getRecentBooks } from '../../utils/storage';

// Mock the 'idb' module
const mockPut = vi.fn();
const mockGet = vi.fn();
const mockGetAllFromIndex = vi.fn();

vi.mock('idb', () => ({
    openDB: vi.fn().mockResolvedValue({
        put: (...args: any[]) => mockPut(...args),
        get: (...args: any[]) => mockGet(...args),
        getAllFromIndex: (...args: any[]) => mockGetAllFromIndex(...args),
        createObjectStore: vi.fn(),
    })
}));

describe('storage.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Mock global crypto/TextEncoder if needed (though our fallback handles it)
        // We want to test that it doesn't crash even without crypto
        Object.defineProperty(global, 'crypto', {
            value: undefined,
            writable: true
        });
    });

    it('should save a book', async () => {
        const file = new File(['content'], 'test.epub', { type: 'application/epub+zip' });

        // Mock checking for existing book
        mockGet.mockResolvedValue(undefined);

        await saveBook(file, 'Test Book', 1000);

        expect(mockPut).toHaveBeenCalledWith(
            'books',
            expect.objectContaining({
                title: 'Test Book',
                totalWords: 1000,
                progress: 0
            })
        );
    });

    it('should update progress', async () => {
        const mockBook = { id: '123', progress: 0, lastRead: 0 };
        mockGet.mockResolvedValue(mockBook);

        await updateProgress('123', 50.5);

        expect(mockPut).toHaveBeenCalledWith(
            'books',
            expect.objectContaining({
                id: '123',
                progress: 50.5
            })
        );
        // lastRead should be updated
        const putCall = mockPut.mock.calls[0][1];
        expect(putCall.lastRead).toBeGreaterThan(0);
    });

    it('should get recent books', async () => {
        mockGetAllFromIndex.mockResolvedValue([{ title: 'Book 1' }]);
        const books = await getRecentBooks();
        expect(books).toHaveLength(1);
        expect(mockGetAllFromIndex).toHaveBeenCalledWith('books', 'by-date');
    });
});
