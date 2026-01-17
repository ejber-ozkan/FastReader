import React, { useEffect, useState } from 'react';
import styles from './SettingsMenu.module.css'; // Reuse container styles for consistency
import { getStats, type ReadingStats } from '../utils/stats';

interface StatsMenuProps {
    onClose: () => void;
    currentSessionWords: number;
    currentSessionTime: number; // seconds
    currentWpm: number;
}

export const StatsMenu: React.FC<StatsMenuProps> = ({
    onClose,
    currentSessionWords,
    currentSessionTime,
    currentWpm
}) => {
    const [lifetimeStats, setLifetimeStats] = useState<ReadingStats | null>(null);

    useEffect(() => {
        setLifetimeStats(getStats());
    }, []);

    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${Math.floor(seconds)}s`;
        const mins = Math.floor(seconds / 60);
        if (mins < 60) return `${mins}m`;
        const hrs = Math.floor(mins / 60);
        return `${hrs}h ${mins % 60}m`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Reading Statistics</h2>
            </div>

            <div className={styles.controls}>
                <div className={styles.controlGroup}>
                    <label style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Current Session</label>
                    <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                        <span>Time Reading</span>
                        <span style={{ fontWeight: 'bold' }}>{formatTime(currentSessionTime)}</span>
                    </div>
                    <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                        <span>Words Consumed</span>
                        <span style={{ fontWeight: 'bold' }}>{currentSessionWords}</span>
                    </div>
                    <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                        <span>Current Speed</span>
                        <span style={{ fontWeight: 'bold' }}>{currentWpm} WPM</span>
                    </div>
                    <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                        <span>Average Speed</span>
                        <span style={{ fontWeight: 'bold' }}>{Math.round(currentSessionWords / (currentSessionTime / 60) || 0)} WPM</span>
                    </div>
                </div>

                <div className={styles.controlGroup} style={{ marginTop: '1rem' }}>
                    <label style={{ color: 'var(--color-accent)', fontSize: '1.1rem' }}>Lifetime</label>
                    {lifetimeStats ? (
                        <>
                            <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                                <span>Total Time</span>
                                <span style={{ fontWeight: 'bold' }}>{formatTime(lifetimeStats.totalTimeSpent + currentSessionTime)}</span>
                            </div>
                            <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                                <span>Total Words</span>
                                <span style={{ fontWeight: 'bold' }}>{(lifetimeStats.totalWordsRead + currentSessionWords).toLocaleString()}</span>
                            </div>
                            <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                                <span>Avg Speed</span>
                                <span style={{ fontWeight: 'bold' }}>{
                                    Math.round(
                                        (lifetimeStats.totalWordsRead + currentSessionWords) /
                                        ((lifetimeStats.totalTimeSpent + currentSessionTime) / 60) || 0
                                    )
                                } WPM</span>
                            </div>
                            <div className={styles.row} style={{ justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                                <span>Books Completed</span>
                                <span style={{ fontWeight: 'bold' }}>{lifetimeStats.booksCompleted}</span>
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
