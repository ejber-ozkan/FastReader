import { useState, useEffect, useRef, type ChangeEvent, type DragEvent } from 'react';
import { ReaderDisplay } from './components/ReaderDisplay';
import { Controls } from './components/Controls';
import { HistoryList } from './components/HistoryList';
import { SettingsMenu } from './components/SettingsMenu';
import { StatsMenu } from './components/StatsMenu';
import { ThemeMenu } from './components/ThemeMenu';
import { useRSVP } from './hooks/useRSVP';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { parseFile } from './utils/fileLoader';
import { saveBook, updateProgress, getRecentBooks, getBook } from './utils/storage';
import { updateStats, incrementSessions } from './utils/stats';

const DEMO_TEXT = "Welcome to FastReader. This is a demo of the Rapid Serial Visual Presentation method. Speed reading allows you to consume content much faster than traditional reading. Try adjusting the WPM slider below to change the speed. Load an EPUB file to start reading your own books.".split(" ");

function App() {
  const [content, setContent] = useState<string[]>(DEMO_TEXT);
  const [fileName, setFileName] = useState<string>("Demo");
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPauseSuggestion, setShowPauseSuggestion] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const accelTimerRef = useRef(0);

  // View State
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [historyItems, setHistoryItems] = useState<any[]>([]);

  // Theme Hook
  const { theme, updateTheme } = useTheme();

  // Settings Hook (Persistent)
  const {
    pausesOn,
    loopOn,
    autoAccelerate,
    wpm: savedWpm,
    updateSettings
  } = useSettings();

  const [autoAccelPulse, setAutoAccelPulse] = useState(false); // Visual cue

  // Session Stats
  const [sessionWordsRead, setSessionWordsRead] = useState(0);
  const [sessionTime, setSessionTime] = useState(0); // Seconds

  const {
    currentWord,
    isPlaying,
    wpm,
    setWpm,
    togglePlay,
    progress,
    setProgress,
    wordsLeft,
    index
  } = useRSVP({ content, initialWPM: savedWpm });

  const [isDragging, setIsDragging] = useState(false);

  // Sync WPM to storage
  useEffect(() => {
    updateSettings({ wpm });
  }, [wpm]);

  // Auto-save progress
  useEffect(() => {
    if (currentBookId && index > 0) {
      // Save every 5 seconds or when pausing
      const saveInterval = setInterval(() => {
        if (isPlaying) updateProgress(currentBookId, progress);
      }, 5000);

      return () => clearInterval(saveInterval);
    }
  }, [currentBookId, isPlaying, progress, index]);

  // Save on pause/unmount
  useEffect(() => {
    if (currentBookId && !isPlaying && index > 0) {
      updateProgress(currentBookId, progress);
    }
  }, [isPlaying, currentBookId, progress, index]);

  // Session Tracking & Pause Suggestion
  useEffect(() => {
    if (isPlaying) {
      if (!sessionStartTime) {
        setSessionStartTime(Date.now());
        incrementSessions();
      }

      const checkInterval = setInterval(() => {
        // Pause Suggestion
        if (sessionStartTime && Date.now() - sessionStartTime > 20 * 60 * 1000) { // 20 minutes
          setShowPauseSuggestion(true);
        }

        // Stats
        setSessionTime(prev => prev + 1);
        const wordsPerSecond = wpm / 60;
        const newWords = Math.floor(wordsPerSecond);
        setSessionWordsRead(prev => prev + newWords);
        updateStats(newWords, 1);

        // Auto-Accelerate Logic
        if (autoAccelerate) {
          accelTimerRef.current += 1;
          if (accelTimerRef.current >= 60) {
            setWpm((prev: number) => Math.min(prev + 10, 1000));
            accelTimerRef.current = 0;
            // Trigger pulse
            setAutoAccelPulse(true);
            setTimeout(() => setAutoAccelPulse(false), 2000);
          }
        } else {
          accelTimerRef.current = 0;
        }
      }, 1000); // Check every 1s

      return () => clearInterval(checkInterval);
    } else {
      setSessionStartTime(null);
      setShowPauseSuggestion(false);
      accelTimerRef.current = 0;
    }
  }, [isPlaying, sessionStartTime, wpm, autoAccelerate]);

  const toggleHistory = async () => {
    if (!showHistory) {
      const books = await getRecentBooks();
      setHistoryItems(books);
      if (isPlaying) togglePlay(); // Pause if reading
    }
    setShowHistory(!showHistory);
    if (showSettings) setShowSettings(false);
    if (showStats) setShowStats(false);
  };

  const toggleSettings = () => {
    if (!showSettings && isPlaying) togglePlay();
    setShowSettings(!showSettings);
    if (showHistory) setShowHistory(false);
    if (showStats) setShowStats(false);
  };

  const toggleStats = () => {
    if (!showStats && isPlaying) togglePlay();
    setShowStats(!showStats);
    if (showHistory) setShowHistory(false);
    if (showSettings) setShowSettings(false);
  };

  const toggleTheme = () => {
    if (!showTheme && isPlaying) togglePlay();
    setShowTheme(!showTheme);
    setShowSettings(false);
    setShowStats(false);
    setShowHistory(false);
  };

  const loadFromHistory = async (id: string) => {
    setIsLoading(true);
    setShowHistory(false);
    try {
      const book = await getBook(id);
      if (!book) throw new Error("Book not found in storage");

      const { title, words } = await parseFile(book.data as File);
      setContent(words);
      setFileName(title);
      setCurrentBookId(id);

      if (book.progress > 0) {
        setTimeout(() => setProgress(book.progress), 50);
      }

    } catch (err: any) {
      console.error("Failed to load history book", err);
      alert("Failed to load book from history.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadFile = async (file: File) => {
    setIsLoading(true);
    setShowHistory(false);
    setShowSettings(false);
    setShowStats(false);
    try {
      const { title, words } = await parseFile(file);

      const { id, progress: savedProgress } = await saveBook(file, title, words.length);

      setContent(words);
      setFileName(title);
      setCurrentBookId(id);

      if (savedProgress > 0) {
        const shouldResume = confirm(`You were at ${savedProgress.toFixed(1)}%. Resume?`);
        if (shouldResume) {
          setTimeout(() => setProgress(savedProgress), 50);
        }
      } else {
        setProgress(0);
      }

    } catch (err: any) {
      console.error("Failed to parse file", err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Failed to read file: ${msg}`);
    } finally {
      setIsLoading(false);
      setIsDragging(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  return (
    <main
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        paddingBottom: '140px' /* Space for controls */
      }}>
      {/* Pause Suggestion Overlay */}
      {showPauseSuggestion && (
        <div style={{
          position: 'absolute',
          top: '20%',
          background: 'rgba(59, 130, 246, 0.9)',
          padding: '1rem 2rem',
          borderRadius: '1rem',
          color: 'white',
          zIndex: 10,
          cursor: 'pointer'
        }} onClick={() => setShowPauseSuggestion(false)}>
          You've been reading for 20 minutes. Consider taking a blink break!
        </div>
      )}

      {/* Header Info */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        width: '100%',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'var(--color-text-dim)',
        fontSize: '0.9rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', overflow: 'hidden' }}>
          <span style={{
            fontWeight: 'bold',
            color: 'var(--color-text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px' // Limit width on mobile
          }}>{fileName}</span>
          {isLoading && <span style={{ flexShrink: 0 }}>Loading...</span>}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>{progress.toFixed(1)}%</span>
          <span>Time left: {(wordsLeft / wpm).toFixed(1)} min</span>
        </div>
      </div>

      {showHistory ? (
        <HistoryList
          items={historyItems}
          onSelect={loadFromHistory}
          onClose={() => setShowHistory(false)}
        />
      ) : showSettings ? (
        <SettingsMenu
          onClose={() => setShowSettings(false)}
          currentTheme={theme}
          onUpdateTheme={updateTheme}
          pausesOn={pausesOn}
          setPausesOn={(v) => updateSettings({ pausesOn: v })}
          loopOn={loopOn}
          setLoopOn={(v) => updateSettings({ loopOn: v })}
          autoAccelerate={autoAccelerate}
          setAutoAccelerate={(v) => updateSettings({ autoAccelerate: v })}
        />
      ) : showTheme ? (
        <ThemeMenu onClose={() => setShowTheme(false)} currentTheme={theme} onUpdateTheme={updateTheme} />
      ) : showStats ? (
        <StatsMenu
          onClose={() => setShowStats(false)}
          currentSessionWords={sessionWordsRead}
          currentSessionTime={sessionTime}
          currentWpm={wpm}
        />
      ) : (
        <ReaderDisplay word={currentWord} />
      )}

      {/* Drag Overlay */}
      {isDragging && !showHistory && !showSettings && !showStats && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          border: '4px dashed var(--color-primary)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <h2 style={{ color: 'var(--color-primary)' }}>Drop file to read</h2>
        </div>
      )}

      {/* File Drop / Upload Overlay only visible on main reader view - Desktop Only */}
      {!showHistory && !showSettings && !showStats && !showTheme && !('ontouchstart' in window || navigator.maxTouchPoints > 0) && (
        <div style={{
          position: 'absolute',
          top: '4rem', /* Below header */
          display: 'flex',
          gap: '1rem',
          pointerEvents: 'none' /* Let clicks pass through if needed, but here we just want the text */
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: '1px dashed var(--color-border)',
            borderRadius: '2rem',
            fontSize: '0.8rem',
            color: 'var(--color-text-dim)',
            opacity: 0.6
          }}>
            <span>Drop EPUB or TXT here</span>
          </div>
        </div>
      )}

      {/* Hidden File Input for Button Trigger */}
      <input
        type="file"
        id="hidden-file-input"
        accept=".epub,.txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '2rem'
      }}>
        <Controls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          wpm={wpm}
          onWpmChange={setWpm}
          progress={progress}
          onSeek={setProgress}
          onOpenFileClick={() => document.getElementById('hidden-file-input')?.click()}
          onHistoryClick={toggleHistory}
          onSettingsClick={toggleSettings}
          onStatsClick={toggleStats}
          onThemeClick={toggleTheme}
          disabled={showHistory || showSettings || showStats || showTheme}
          autoAccelPulse={autoAccelPulse}
        />
      </div>
    </main>
  );
}

export default App;
