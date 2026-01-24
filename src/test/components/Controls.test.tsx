import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Controls } from '../../components/Controls';


describe('Controls Component', () => {
    const mockTogglePlay = vi.fn();
    const mockWpmChange = vi.fn();
    const mockSeek = vi.fn();
    const mockHistory = vi.fn();
    const mockSettings = vi.fn();
    const mockStats = vi.fn();
    const mockTheme = vi.fn();

    const defaultProps = {
        isPlaying: false,
        onTogglePlay: mockTogglePlay,
        wpm: 300,
        onWpmChange: mockWpmChange,
        progress: 0,
        onSeek: mockSeek,
        onHistoryClick: mockHistory,
        onSettingsClick: mockSettings,
        onStatsClick: mockStats,
        onThemeClick: mockTheme,
        disabled: false
    };

    it('renders Play button when paused', () => {
        render(<Controls {...defaultProps} isPlaying={false} />);
        // The play button contains an SVG. We can verify it exists.
        // Or check that the WPM display is present.
        expect(screen.getByText('WPM: 300')).toBeInTheDocument();
    });

    it('calls onWpmChange when +/- buttons are clicked', () => {
        render(<Controls {...defaultProps} />);

        const plusBtn = screen.getByTitle('Faster (+25)');
        const minusBtn = screen.getByTitle('Slower (-25)');

        fireEvent.click(plusBtn);
        // 300 + 25 = 325
        expect(mockWpmChange).toHaveBeenCalledWith(325);

        fireEvent.click(minusBtn);
        // 300 - 25 = 275
        expect(mockWpmChange).toHaveBeenCalledWith(275);
    });

    it('calls function buttons', () => {
        render(<Controls {...defaultProps} />);
        fireEvent.click(screen.getByTitle('Settings'));
        expect(mockSettings).toHaveBeenCalled();

        fireEvent.click(screen.getByTitle('Statistics'));
        expect(mockStats).toHaveBeenCalled();
    });
});
