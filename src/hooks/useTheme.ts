import { useState, useEffect } from 'react';

export interface ThemeState {
    bgColor: string;
    textColor: string;
    focusColor: string;
    font: string;
    fontScale: number;
    pauseScale: number; // Managed here for consistency with other settings
}

const THEME_KEY = 'FastReader_Theme';

const DEFAULT_THEME: ThemeState = {
    bgColor: '#050505',
    textColor: '#ffffff',
    focusColor: '#ef4444',
    font: 'Inter',
    fontScale: 1,
    pauseScale: 1
};

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeState>(() => {
        try {
            const stored = localStorage.getItem(THEME_KEY);
            return stored ? { ...DEFAULT_THEME, ...JSON.parse(stored) } : DEFAULT_THEME;
        } catch (e) {
            return DEFAULT_THEME;
        }
    });

    const updateTheme = (updates: Partial<ThemeState>) => {
        setTheme(prev => {
            const newTheme = { ...prev, ...updates };
            // Persist immediately on change
            localStorage.setItem(THEME_KEY, JSON.stringify(newTheme));
            return newTheme;
        });
    };

    // Apply to DOM
    useEffect(() => {
        const root = document.documentElement;

        // Colors
        root.style.setProperty('--color-bg', theme.bgColor);
        root.style.setProperty('--color-text', theme.textColor);
        root.style.setProperty('--color-accent', theme.focusColor);

        // Calculate a surface color derived from BG? 
        // For now, simpler to just keep surface dark/light based on simple logic or use variables.
        // If BG is light, surface should be slightly darker?
        // Let's assume surface follows standard dark/light logic roughly.
        // Actually, we can check brightness or just let components inherit.

        // Font
        if (theme.font === 'Montserrat') {
            root.style.setProperty('--font-sans', "'Montserrat', sans-serif");
            root.style.setProperty('--font-mono', "'Montserrat', monospace");
        } else if (theme.font === 'Serif') {
            root.style.setProperty('--font-sans', "'Merriweather', 'Georgia', serif");
            root.style.setProperty('--font-mono', "'Courier New', monospace");
        } else {
            root.style.setProperty('--font-sans', "'Inter', sans-serif");
            root.style.setProperty('--font-mono', "'JetBrains Mono', monospace");
        }

        // Scale
        root.style.setProperty('--reader-scale', `${theme.fontScale}`);

    }, [theme]);

    return {
        theme,
        updateTheme
    };
};
