export interface Theme {
    id: string;
    name: string;
    colors: {
        bg: string;
        text: string;
        accent: string;
        surface?: string;
    };
}

export interface ThemeGroup {
    name: string;
    themes: Theme[];
}

export const THEME_PRESETS: ThemeGroup[] = [
    {
        name: "Monochrome",
        themes: [
            {
                id: 'dark-default',
                name: 'Midnight',
                colors: { bg: '#050505', text: '#ffffff', accent: '#ef4444' }
            },
            {
                id: 'dark-slate',
                name: 'Slate',
                colors: { bg: '#1e293b', text: '#f8fafc', accent: '#38bdf8' }
            },
            {
                id: 'light-paper',
                name: 'Paper',
                colors: { bg: '#ffffff', text: '#111827', accent: '#ef4444' }
            },
            {
                id: 'light-cream',
                name: 'Cream',
                colors: { bg: '#fdfbf7', text: '#4b5563', accent: '#d97706' }
            }
        ]
    },
    {
        name: "Vibrant",
        themes: [
            {
                id: 'vibrant-neon',
                name: 'Neon',
                colors: { bg: '#171717', text: '#e5e5e5', accent: '#eab308' } // Yellow accent
            },
            {
                id: 'vibrant-ocean',
                name: 'Ocean',
                colors: { bg: '#0c4a6e', text: '#f0f9ff', accent: '#22d3ee' } // Cyan accent
            },
            {
                id: 'vibrant-rose',
                name: 'Rose',
                colors: { bg: '#881337', text: '#fff1f2', accent: '#f43f5e' }
            }
        ]
    },
    {
        name: "Soft",
        themes: [
            {
                id: 'soft-pastel-pink',
                name: 'Blush',
                colors: { bg: '#fdf2f8', text: '#831843', accent: '#db2777' }
            },
            {
                id: 'soft-mint',
                name: 'Mint',
                colors: { bg: '#f0fdf4', text: '#14532d', accent: '#16a34a' }
            },
            {
                id: 'soft-lavender',
                name: 'Lavender',
                colors: { bg: '#f5f3ff', text: '#4c1d95', accent: '#7c3aed' }
            }
        ]
    }
];
