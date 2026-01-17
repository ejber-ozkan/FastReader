import React from 'react';
import styles from './SettingsMenu.module.css'; // Reusing layout styles
import { THEME_PRESETS, type Theme } from '../utils/themes';
import { type ThemeState } from '../hooks/useTheme';

interface ThemeMenuProps {
    onClose: () => void;
    currentTheme: ThemeState;
    onUpdateTheme: (updates: Partial<ThemeState>) => void;
}

export const ThemeMenu: React.FC<ThemeMenuProps> = ({ onClose, currentTheme, onUpdateTheme }) => {

    const applyPreset = (theme: Theme) => {
        onUpdateTheme({
            bgColor: theme.colors.bg,
            textColor: theme.colors.text,
            focusColor: theme.colors.accent
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Pick a Theme</h2>
            </div>

            <div className={styles.controls} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {THEME_PRESETS.map(group => (
                    <div key={group.name} className={styles.controlGroup}>
                        <label style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', width: '100%', display: 'block', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>{group.name}</label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                            gap: '0.5rem'
                        }}>
                            {group.themes.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => applyPreset(t)}
                                    style={{
                                        background: t.colors.bg,
                                        border: currentTheme.bgColor === t.colors.bg ? '2px solid var(--color-primary)' : '1px solid rgba(128,128,128,0.2)',
                                        borderRadius: '8px',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        height: '80px',
                                        justifyContent: 'center'
                                    }}
                                    title={t.name}
                                >
                                    <div style={{
                                        color: t.colors.text,
                                        fontWeight: 'bold',
                                        lineHeight: '1.2'
                                    }}>
                                        Aa
                                        <span style={{ color: t.colors.accent, marginLeft: '2px' }}>●</span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        color: t.colors.text,
                                        opacity: 0.8,
                                        marginTop: '4px'
                                    }}>{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
