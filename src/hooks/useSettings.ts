import { useState, useRef } from 'react';

const SETTINGS_KEY = 'FastReader_Settings';

export interface AppSettings {
    pausesOn: boolean;
    loopOn: boolean;
    autoAccelerate: boolean;
    wpm: number;
}

const DEFAULT_SETTINGS: AppSettings = {
    pausesOn: true,
    loopOn: false,
    autoAccelerate: false,
    wpm: 300
};

export const useSettings = () => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        try {
            const stored = localStorage.getItem(SETTINGS_KEY);
            return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
        } catch (e) {
            console.warn("Failed to load settings:", e);
            return DEFAULT_SETTINGS;
        }
    });

    const timerRef = useRef<number>(0);

    const updateSettings = (updates: Partial<AppSettings>) => {
        setSettings(prev => {
            const newSettings = { ...prev, ...updates };

            clearTimeout(timerRef.current);
            // @ts-ignore
            timerRef.current = setTimeout(() => {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
            }, 500);

            return newSettings;
        });
    };

    return {
        ...settings,
        updateSettings
    };
};
