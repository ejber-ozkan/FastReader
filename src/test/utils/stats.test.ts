import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateStats, getStats, incrementSessions, STATS_KEY } from '../../utils/stats';

describe('stats.ts', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should return default stats when empty', () => {
        const stats = getStats();
        expect(stats).toEqual({
            totalWordsRead: 0,
            totalTimeSpent: 0,
            booksCompleted: 0,
            sessions: 0
        });
    });

    it('should update stats correctly', () => {
        updateStats(100, 60); // 100 words, 60 seconds
        const stats = getStats();
        expect(stats.totalWordsRead).toBe(100);
        expect(stats.totalTimeSpent).toBe(60);
    });

    it('should increment sessions correctly', () => {
        incrementSessions();
        const stats = getStats();
        expect(stats.sessions).toBe(1);

        incrementSessions();
        expect(getStats().sessions).toBe(2);
    });
});
