import { useState, useEffect, useRef, useCallback } from 'react';

interface UseRSVPProps {
    content: string[]; // Array of words
    initialWPM?: number;
}

export function useRSVP({ content, initialWPM = 300 }: UseRSVPProps) {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(initialWPM);

    const timerRef = useRef<number | null>(null);

    const currentWord = content[index] || "";
    const progress = content.length > 0 ? (index / content.length) * 100 : 0;
    const wordsLeft = content.length - index;

    const stop = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsPlaying(false);
    }, []);

    const play = useCallback(() => {
        if (index >= content.length) {
            setIndex(0); // Restart if at end
        }
        setIsPlaying(true);
    }, [index, content.length]);

    const togglePlay = useCallback(() => {
        if (isPlaying) stop();
        else play();
    }, [isPlaying, stop, play]);

    // Main Timer Loop
    useEffect(() => {
        if (!isPlaying) return;

        const intervalMs = 60000 / wpm;

        timerRef.current = window.setInterval(() => {
            setIndex((prev) => {
                if (prev >= content.length - 1) {
                    stop();
                    return prev;
                }
                return prev + 1;
            });
        }, intervalMs);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, wpm, content.length, stop]);

    const seek = (newIndex: number) => {
        const clamped = Math.max(0, Math.min(newIndex, content.length - 1));
        setIndex(clamped);
    };

    const setProgress = (percent: number) => {
        const newIndex = Math.floor((percent / 100) * content.length);
        seek(newIndex);
    };

    return {
        index,
        currentWord,
        isPlaying,
        wpm,
        setWpm,
        togglePlay,
        seek,
        progress,
        setProgress,
        wordsLeft,
        totalWords: content.length
    };
}
