import React from 'react';
import { BookOpen } from 'lucide-react';
import styles from './HistoryList.module.css';

interface HistoryItem {
    id: string;
    title: string;
    progress: number;
    lastRead: number;
    type: string;
}

interface HistoryListProps {
    items: HistoryItem[];
    onSelect: (id: string) => void;
    onClose: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ items, onSelect, onClose }) => {
    // Sort by date desc
    const sorted = [...items].sort((a, b) => b.lastRead - a.lastRead);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Your Library</h2>
                <button className={styles.closeBtn} onClick={onClose}>Close</button>
            </div>

            <div className={styles.list}>
                {sorted.length === 0 ? (
                    <div className={styles.empty}>No entries yet. Drop a file to start!</div>
                ) : (
                    sorted.map(item => (
                        <div key={item.id} className={styles.item} onClick={() => onSelect(item.id)}>
                            <div className={styles.icon}>
                                <BookOpen size={24} />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.meta}>
                                    <span>{(item.progress || 0).toFixed(1)}% read</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{new Date(item.lastRead).toLocaleDateString()}</span>
                                    <span className={styles.badge}>{item.type.toUpperCase().replace('TEXT/PLAIN', 'TXT')}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
