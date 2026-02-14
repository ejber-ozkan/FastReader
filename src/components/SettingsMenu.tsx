import React from 'react';
import styles from './SettingsMenu.module.css';
import { type ThemeState } from '../hooks/useTheme';

interface SettingsMenuProps {
    onClose: () => void;
    currentTheme: ThemeState;
    onUpdateTheme: (updates: Partial<ThemeState>) => void;
    pausesOn: boolean;
    setPausesOn: (v: boolean) => void;
    loopOn: boolean;
    setLoopOn: (v: boolean) => void;
    autoAccelerate: boolean;
    setAutoAccelerate: (v: boolean) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
    onClose,
    currentTheme,
    onUpdateTheme,
    pausesOn,
    setPausesOn,
    loopOn,
    setLoopOn,
    autoAccelerate,
    setAutoAccelerate
}) => {
    // Destructure for easy access
    const { pauseScale, fontScale } = currentTheme;

    const handleReset = () => {
        onUpdateTheme({
            bgColor: '#050505',
            textColor: '#ffffff',
            focusColor: '#ef4444',
            font: 'Inter',
            fontScale: 1,
            pauseScale: 1
        });
        setPausesOn(true);
        setLoopOn(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Settings</h2>
            </div>

            <div className={styles.controls}>
                {/* Toggles */}
                <div className={styles.row}>
                    <button
                        className={`${styles.toggleBtn} ${pausesOn ? styles.active : ''}`}
                        onClick={() => setPausesOn(!pausesOn)}
                    >
                        Pauses: {pausesOn ? 'On' : 'Off'}
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${loopOn ? styles.active : ''}`}
                        onClick={() => setLoopOn(!loopOn)}
                    >
                        Loop: {loopOn ? 'On' : 'Off'}
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${autoAccelerate ? styles.active : ''}`}
                        onClick={() => setAutoAccelerate(!autoAccelerate)}
                        title="Increases speed by 10 WPM every minute"
                    >
                        Auto-Accel: {autoAccelerate ? 'On' : 'Off'}
                    </button>
                </div>

                {/* Pause Scale */}
                <div className={styles.controlGroup}>
                    <label>Pause scale</label>
                    <div className={styles.sliderRow}>
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={pauseScale}
                            onChange={(e) => onUpdateTheme({ pauseScale: parseFloat(e.target.value) })}
                        />
                        <span className={styles.valueDisplay}>{pauseScale}</span>
                    </div>
                </div>

                {/* Font and Colors moved to ThemeMenu, Font option removed completely as per request */}

                {/* Font Scale */}
                <div className={styles.controlGroup}>
                    <label>Font scale</label>
                    <div className={styles.sliderRow}>
                        <input
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.1"
                            value={fontScale}
                            onChange={(e) => onUpdateTheme({ fontScale: parseFloat(e.target.value) })}
                        />
                        <span className={styles.valueDisplay}>{fontScale}</span>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={handleReset}>Reset</button>
                <button className={styles.actionBtn} onClick={onClose}>Close</button>
                <button className={`${styles.actionBtn} ${styles.primary}`} onClick={onClose}>Apply</button>
            </div>

            <div className={styles.footer}>
                <small>Version 1.1.0 - Ejber Ozkan</small>
            </div>
        </div>
    );
};
