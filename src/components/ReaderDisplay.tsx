import React from 'react';
import { splitWordAtORP } from '../utils/rsvp';
import styles from './ReaderDisplay.module.css';

interface ReaderDisplayProps {
    word: string;
}

export const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ word }) => {
    const { left, center, right } = splitWordAtORP(word);

    // Dynamic scaling logic
    // Base size is 5rem (~80px). If word is long (e.g. > 10 chars), we scale down.
    // Also consider viewport width (vw).
    // A simple heuristic: 
    // If length < 8: 5rem
    // If length > 8: scale down proportional to length

    // Better approach: use a clamp based on character count
    // max-width is roughly 90vw.
    // font-size ~= 90vw / (word.length * 0.6) (approx char width factor)

    const getFontSize = (len: number) => {
        if (len <= 7) return '5rem';
        if (len <= 12) return '3.5rem';
        if (len <= 15) return '2.5rem';
        return '2rem'; // Extra long words
    };

    const fontSize = getFontSize(word.length);

    return (
        <div className={styles.container} style={{ fontSize: fontSize } as React.CSSProperties}>
            <div className={styles.wordContainer}>
                <span className={styles.left}>{left}</span>
                <span className={styles.center}>{center}</span>
                <span className={styles.right}>{right}</span>
            </div>
            <div className={styles.guidelineTop} />
            <div className={styles.guidelineBottom} />
        </div>
    );
};
