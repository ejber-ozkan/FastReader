import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRSVP } from '../../hooks/useRSVP';

describe('useRSVP Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useRSVP({ content: ['word1', 'word2'] }));
        expect(result.current.index).toBe(0);
        expect(result.current.isPlaying).toBe(false);
        expect(result.current.wpm).toBe(300);
        expect(result.current.currentWord).toBe('word1');
    });

    it('should start playing and advance words', () => {
        const { result } = renderHook(() => useRSVP({ content: ['start', 'middle', 'end'], initialWPM: 60 }));

        // 60 WPM = 1 word per 1000ms

        act(() => {
            result.current.togglePlay();
        });
        expect(result.current.isPlaying).toBe(true);
        expect(result.current.currentWord).toBe('start');

        act(() => {
            vi.advanceTimersByTime(1000); // 1s
        });
        expect(result.current.currentWord).toBe('middle');

        act(() => {
            vi.advanceTimersByTime(1000); // 1s
        });
        expect(result.current.currentWord).toBe('end');
    });

    it('should stop automatically at the end', () => {
        const { result } = renderHook(() => useRSVP({ content: ['a', 'b'], initialWPM: 60 }));

        act(() => {
            result.current.togglePlay();
        });

        // 60 WPM = 1000ms per word
        // Keyword 'a' at 0ms
        act(() => {
            vi.advanceTimersByTime(1100); // 1.1s -> should be at 'b'
        });
        expect(result.current.index).toBe(1);
        expect(result.current.isPlaying).toBe(true);

        // Keyword 'b' at 1100ms
        act(() => {
            vi.advanceTimersByTime(1100); // 2.2s -> should have finished 'b' and stopped
        });

        expect(result.current.isPlaying).toBe(false);
        expect(result.current.index).toBe(1);
    });

    it('should update WPM dynamically', () => {
        const { result } = renderHook(() => useRSVP({ content: ['a', 'b', 'c'], initialWPM: 60 }));

        act(() => {
            result.current.setWpm(120); // 0.5s per word
        });
        expect(result.current.wpm).toBe(120);
    });

    it('should seek to specific index', () => {
        const { result } = renderHook(() => useRSVP({ content: ['a', 'b', 'c'] }));

        act(() => {
            result.current.seek(2);
        });
        expect(result.current.currentWord).toBe('c');
    });
});
