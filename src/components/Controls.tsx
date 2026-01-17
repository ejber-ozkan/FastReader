import React from 'react';
import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react';
import styles from './Controls.module.css';

interface ControlsProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    wpm: number;
    onWpmChange: (wpm: number) => void;
    progress: number;
    onSeek: (percent: number) => void;
    onHistoryClick?: () => void;
    onSettingsClick?: () => void;
    onStatsClick?: () => void;
    onThemeClick?: () => void;
    disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
    isPlaying,
    onTogglePlay,
    wpm,
    onWpmChange,
    progress,
    onSeek,
    onHistoryClick,
    onSettingsClick,
    onStatsClick,
    onThemeClick,
    disabled = false
}) => {
    return (
        <div className={styles.controlsContainer}>
            {/* Progress Bar */}
            <div className={styles.progressContainer}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={(e) => onSeek(parseFloat(e.target.value))}
                    className={styles.progressBar}
                />
            </div>

            {/* Buttons */}
            <div className={styles.buttonRow}>
                <button className={styles.iconBtn} onClick={() => { }} title="Rewind 30s" disabled={disabled}>
                    <RotateCcw size={20} />
                    <span className={styles.tinyLabel}>30s</span>
                </button>

                <button
                    className={styles.speedBtn}
                    onClick={() => onWpmChange(Math.max(100, wpm - 25))}
                    disabled={disabled}
                    title="Slower (-25)"
                >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>-</span>
                </button>

                <button className={styles.playBtn} onClick={onTogglePlay} disabled={disabled}>
                    {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                </button>

                <button
                    className={styles.speedBtn}
                    onClick={() => onWpmChange(Math.min(1000, wpm + 25))}
                    disabled={disabled}
                    title="Faster (+25)"
                >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</span>
                </button>

                <button className={styles.iconBtn} onClick={() => { }} title="Forward 30s" disabled={disabled}>
                    <RotateCw size={20} />
                    <span className={styles.tinyLabel}>30s</span>
                </button>
            </div>

            {/* Function Buttons Row */}
            <div className={styles.functionRow}>
                <button className={styles.functionBtn} title="History" onClick={onHistoryClick}>History</button>
                <button className={styles.functionBtn} title="Settings" onClick={onSettingsClick}>Settings</button>
                <button className={styles.functionBtn} title="Statistics" onClick={onStatsClick}>Stats</button>
                {/* <button className={styles.functionBtn}>Bkmark</button> REMOVED */}
                <button className={styles.functionBtn} title="Themes" onClick={onThemeClick}>Theme</button>
            </div>

            {/* WPM Control */}
            <div className={styles.wpmControl}>
                <span className={styles.label}>WPM: {wpm}</span>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="10"
                    value={wpm}
                    onChange={(e) => onWpmChange(parseInt(e.target.value))}
                    className={styles.wpmSlider}
                />
            </div>

        </div>
    );
};
