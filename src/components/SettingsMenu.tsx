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
    const { bgColor, textColor, focusColor, font, pauseScale, fontScale } = currentTheme;

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

                {/* Font */}
                <div className={styles.controlGroup}>
                    <label>Font</label>
                    <select value={font} onChange={(e) => onUpdateTheme({ font: e.target.value })} className={styles.select}>
                        <option value="Inter">Inter</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Serif">Serif</option>
                    </select>
                </div>

                {/* Colors */}
                <div className={styles.controlGroup}>
                    <label>Screen</label>
                    <div className={styles.colorRow}>
                        <div className={styles.colorPreview} style={{ background: bgColor }} />
                        <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => onUpdateTheme({ bgColor: e.target.value })}
                            className={styles.colorInput}
                        />
                        {/* Hidden native picker for ease */}
                        <input type="color" value={bgColor} onChange={(e) => onUpdateTheme({ bgColor: e.target.value })} className={styles.nativePicker} />
                    </div>
                </div>

                <div className={styles.controlGroup}>
                    <label>Text</label>
                    <div className={styles.colorRow}>
                        <div className={styles.colorPreview} style={{ background: textColor }} />
                        <input
                            type="text"
                            value={textColor}
                            onChange={(e) => onUpdateTheme({ textColor: e.target.value })}
                            className={styles.colorInput}
                        />
                        <input type="color" value={textColor} onChange={(e) => onUpdateTheme({ textColor: e.target.value })} className={styles.nativePicker} />
                    </div>
                </div>

                <div className={styles.controlGroup}>
                    <label>Focus</label>
                    <div className={styles.colorRow}>
                        <div className={styles.colorPreview} style={{ background: focusColor }} />
                        <input
                            type="text"
                            value={focusColor}
                            onChange={(e) => onUpdateTheme({ focusColor: e.target.value })}
                            className={styles.colorInput}
                        />
                        <input type="color" value={focusColor} onChange={(e) => onUpdateTheme({ focusColor: e.target.value })} className={styles.nativePicker} />
                    </div>
                </div>

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
        </div>
    );
};
