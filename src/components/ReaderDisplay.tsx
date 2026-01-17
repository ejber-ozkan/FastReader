import React from 'react';
import { splitWordAtORP } from '../utils/rsvp';
import styles from './ReaderDisplay.module.css';

interface ReaderDisplayProps {
    word: string;
}

export const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ word }) => {
    const { left, center, right } = splitWordAtORP(word);

    return (
        <div className={styles.container}>
            <div className={styles.wordContainer}>
                <span className={styles.left}>{left}</span>
                <span className={styles.center}>{center}</span>
                <span className={styles.right}>{right}</span>
            </div>
            {/* Dynamic guiding lines can be added here */}
            <div className={styles.guidelineTop} />
            <div className={styles.guidelineBottom} />
        </div>
    );
};
