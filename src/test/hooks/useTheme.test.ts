import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useTheme } from '../../hooks/useTheme';

const THEME_KEY = 'FastReader_Theme';

describe('useTheme Hook', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.style.cssText = '';
    });

    it('should initialize with default theme', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toMatchObject({
            bgColor: '#050505',
            font: 'Inter'
        });
        expect(document.documentElement.style.getPropertyValue('--color-bg')).toBe('#050505');
    });

    it('should load theme from local storage', () => {
        const stored = { bgColor: '#123456', font: 'Serif' };
        localStorage.setItem(THEME_KEY, JSON.stringify(stored));

        const { result } = renderHook(() => useTheme());
        expect(result.current.theme.bgColor).toBe('#123456');
        expect(document.documentElement.style.getPropertyValue('--color-bg')).toBe('#123456');
    });

    it('should update theme and persist', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.updateTheme({ bgColor: '#00ff00', fontScale: 1.5 });
        });

        expect(result.current.theme.bgColor).toBe('#00ff00');
        expect(result.current.theme.fontScale).toBe(1.5);

        // Check DOM
        expect(document.documentElement.style.getPropertyValue('--color-bg')).toBe('#00ff00');
        expect(document.documentElement.style.getPropertyValue('--reader-scale')).toBe('1.5');

        // Check Storage
        const stored = JSON.parse(localStorage.getItem(THEME_KEY)!);
        expect(stored.bgColor).toBe('#00ff00');
    });

    it('should handle font changes', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.updateTheme({ font: 'Montserrat' });
        });
        expect(document.documentElement.style.getPropertyValue('--font-sans')).toContain('Montserrat');

        act(() => {
            result.current.updateTheme({ font: 'Serif' });
        });
        expect(document.documentElement.style.getPropertyValue('--font-sans')).toContain('Georgia');
    });
});
