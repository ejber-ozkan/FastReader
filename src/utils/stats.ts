export interface ReadingStats {
    totalWordsRead: number;
    totalTimeSpent: number; // in seconds
    booksCompleted: number;
    sessions: number;
}

export const STATS_KEY = 'FastReader_Stats';

export const getStats = (): ReadingStats => {
    try {
        const stored = localStorage.getItem(STATS_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to load stats", e);
    }
    return { totalWordsRead: 0, totalTimeSpent: 0, booksCompleted: 0, sessions: 0 };
};

export const updateStats = (newWords: number, timeSpent: number) => {
    const stats = getStats();
    stats.totalWordsRead += newWords;
    stats.totalTimeSpent += timeSpent;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const incrementBooksCompleted = () => {
    const stats = getStats();
    stats.booksCompleted += 1;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const incrementSessions = () => {
    const stats = getStats();
    stats.sessions += 1;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};
