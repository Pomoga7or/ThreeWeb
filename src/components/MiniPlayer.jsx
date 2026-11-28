import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC_PLAYLIST, MUSIC_VOLUME, PLAYER_ENABLED } from '../data/musicConfig';
import { useGameStore } from '../store/useGameStore';

const DIALOGUE_DUCK_FACTOR = 0.38;

export function MiniPlayer({ isDialogueOpen = false }) {
  const isPlayingGame = useGameStore((state) => state.isPlaying);
  const masterVolume = useGameStore((state) => state.settings.masterVolume);
  const musicMuted = useGameStore((state) => state.settings.musicMuted);

  const audioRef = useRef(null);
  const shouldAutoplayRef = useRef(false);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = MUSIC_PLAYLIST[trackIndex] || MUSIC_PLAYLIST[0];

  const computeMusicVolume = useCallback(() => {
    if (musicMuted) return 0;
    const master = Math.min(1, Math.max(0, Number(masterVolume) ?? 1));
    const musicBase = Math.min(1, Math.max(0, Number(MUSIC_VOLUME) ?? 0.25));
    let vol = master * musicBase;
    if (isDialogueOpen) {
      vol *= DIALOGUE_DUCK_FACTOR;
    }
    return Math.min(1, Math.max(0, vol));
  }, [musicMuted, masterVolume, isDialogueOpen]);

  const applyVolume = useCallback(
    (audioEl) => {
      const el = audioEl || audioRef.current;
      if (!el) return;
      const target = computeMusicVolume();
      el.muted = target === 0;
      el.volume = target;
    },
    [computeMusicVolume]
  );

  useEffect(() => {
    applyVolume();
  }, [applyVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !PLAYER_ENABLED) return;

    if (!isPlayingGame) {
      audio.pause();
      setIsAudioPlaying(false);
      shouldAutoplayRef.current = false;
      return;
    }

    applyVolume(audio);
    shouldAutoplayRef.current = true;
    audio
      .play()
      .then(() => {
        applyVolume(audio);
        setIsAudioPlaying(true);
      })
      .catch(() => setIsAudioPlaying(false));
  }, [isPlayingGame, applyVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !PLAYER_ENABLED) return;

    setProgress(0);
    applyVolume(audio);
    audio.load();

    if (isPlayingGame && (isAudioPlaying || shouldAutoplayRef.current)) {
      applyVolume(audio);
      audio
        .play()
        .then(() => {
          applyVolume(audio);
          setIsAudioPlaying(true);
          shouldAutoplayRef.current = false;
        })
        .catch(() => setIsAudioPlaying(false));
    }
  }, [trackIndex, currentTrack.src]);

  if (!PLAYER_ENABLED || !isPlayingGame) return null;

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      applyVolume(audio);
      audio
        .play()
        .then(() => {
          applyVolume(audio);
          setIsAudioPlaying(true);
        })
        .catch(() => setIsAudioPlaying(false));
    }
  };

  const handlePrev = () => {
    setIsAudioPlaying(true);
    setTrackIndex((prev) => (prev - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length);
  };

  const handleNext = () => {
    setIsAudioPlaying(true);
    setTrackIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || Number.isNaN(audio.duration)) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || Number.isNaN(audio.duration)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
  };

  const trackCounter = `${String(trackIndex + 1).padStart(2, '0')}/${String(
    MUSIC_PLAYLIST.length
  ).padStart(2, '0')}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '18px',
        right: '20px',
        zIndex: 2500,
        width: '260px',
        background: 'var(--retro-card-bg)',
        color: 'var(--retro-text)',
        border: '2px solid var(--retro-border)',
        borderLeft: '6px solid var(--retro-accent)',
        padding: '8px 10px',
        boxShadow: '4px 4px 0px #000',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        pointerEvents: 'auto',
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onLoadedMetadata={(e) => applyVolume(e.currentTarget)}
        onCanPlay={(e) => applyVolume(e.currentTarget)}
        onPlay={(e) => applyVolume(e.currentTarget)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        preload="metadata"
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          fontSize: '0.75rem',
          letterSpacing: '0.8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              color: isAudioPlaying && !musicMuted ? '#99fd47' : 'var(--retro-accent)',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            {isAudioPlaying && !musicMuted ? '►' : '■'}
          </span>
          <span
            title={currentTrack.title}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {currentTrack.title}
          </span>
        </div>

        <span
          style={{
            fontSize: '0.68rem',
            color: 'var(--retro-text-muted, #aaa)',
            flexShrink: 0,
          }}
        >
          {trackCounter}
        </span>
      </div>

      <div
        onClick={handleSeek}
        title="Seek"
        style={{
          height: '6px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.12)',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: musicMuted ? 'var(--retro-text-muted, #777)' : 'var(--retro-accent)',
            transition: 'width 0.12s linear',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <button type="button" onClick={handlePrev} style={btnStyle} title="Prev">
          |&lt;
        </button>
        <button
          type="button"
          onClick={handleTogglePlay}
          style={{
            ...btnStyle,
            background: isAudioPlaying ? 'var(--retro-accent)' : 'transparent',
            minWidth: '30px',
          }}
          title={isAudioPlaying ? 'Pause' : 'Play'}
        >
          {isAudioPlaying ? '||' : '▶'}
        </button>
        <button type="button" onClick={handleNext} style={btnStyle} title="Next">
          &gt;|
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: 'transparent',
  color: 'var(--retro-text)',
  border: '1px solid var(--retro-border)',
  padding: '3px 7px',
  fontSize: '0.7rem',
  letterSpacing: '0.8px',
  cursor: 'pointer',
};