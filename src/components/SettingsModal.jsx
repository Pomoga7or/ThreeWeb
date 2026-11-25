import React from 'react';
import { useGameStore } from '../store/useGameStore';

export function SettingsModal({ isOpen, onClose }) {
  const settings = useGameStore((state) => state.settings);
  const updateSettings = useGameStore((state) => state.updateSettings);

  if (!isOpen) return null;

  const volumePercent = Math.round(settings.masterVolume * 100);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2100,
        pointerEvents: 'auto',
      }}
    >
      <style>{`
        @keyframes modalSlam {
          0% { transform: scale(0.94) rotate(-3deg); opacity: 0; }
          100% { transform: scale(1) rotate(-1.5deg); opacity: 1; }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '560px',
          maxWidth: '92vw',
          background: 'var(--retro-bg)',
          border: '2px solid var(--retro-border)',
          borderLeft: '14px solid var(--retro-accent)',
          boxShadow: '14px 14px 40px rgba(0, 0, 0, 0.95)',
          padding: '32px 38px',
          color: 'var(--retro-text)',
          transform: 'rotate(-1.5deg)',
          animation: 'modalSlam 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxSizing: 'border-box',
          clipPath: 'polygon(0% 1%, 99% 0%, 100% 30%, 98% 68%, 100% 99%, 1% 100%, 2% 52%)',
        }}
      >
        {/* Заголовок */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '2.2rem',
            letterSpacing: '5px',
            marginBottom: '26px',
            paddingBottom: '12px',
            borderBottom: '2px solid var(--retro-border)',
            textTransform: 'uppercase',
            textShadow: '2px 2px 0px var(--retro-accent)',
          }}
        >
          <span>OPTIONS</span>
          <span style={{ fontSize: '0.95rem', letterSpacing: '2px', color: 'var(--retro-text-muted)' }}>
            SYS.CFG
          </span>
        </div>

        {/* Строки настроек */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          {/* VOLUME */}
          <div
            style={{
              background: 'var(--retro-card-bg)',
              borderLeft: '6px solid #333',
              padding: '16px 20px',
              clipPath: 'polygon(0% 4%, 99% 0%, 100% 96%, 1% 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.3rem',
                letterSpacing: '2px',
                marginBottom: '10px',
              }}
            >
              <span>VOLUME</span>
              <span style={{ color: 'var(--retro-text)' }}>{volumePercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={volumePercent}
              onChange={(e) => updateSettings({ masterVolume: Number(e.target.value) / 100 })}
              style={{
                width: '100%',
                accentColor: 'var(--retro-accent)',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* MUSIC */}
          <div
            style={{
              background: 'var(--retro-card-bg)',
              borderLeft: '6px solid #333',
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              clipPath: 'polygon(0% 0%, 99% 4%, 100% 100%, 1% 96%)',
            }}
          >
            <span style={{ fontSize: '1.3rem', letterSpacing: '2px' }}>MUSIC</span>
            <button
              onClick={() => updateSettings({ musicMuted: !settings.musicMuted })}
              style={{
                background: !settings.musicMuted ? 'var(--retro-text)' : '#141414',
                color: !settings.musicMuted ? '#000000' : 'var(--retro-text)',
                border: '2px solid var(--retro-border)',
                borderLeft: !settings.musicMuted ? '8px solid var(--retro-accent)' : '2px solid var(--retro-border)',
                padding: '8px 20px',
                fontSize: '1.05rem',
                letterSpacing: '2px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {settings.musicMuted ? 'MUTED' : 'ON'}
            </button>
          </div>

          {/* GRAPHICS */}
          <div
            style={{
              background: 'var(--retro-card-bg)',
              borderLeft: '6px solid #333',
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              clipPath: 'polygon(0% 4%, 99% 0%, 100% 96%, 1% 100%)',
            }}
          >
            <span style={{ fontSize: '1.3rem', letterSpacing: '2px' }}>GRAPHICS</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['low', 'high'].map((mode) => {
                const isActive = settings.graphicsQuality === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => updateSettings({ graphicsQuality: mode })}
                    style={{
                      background: isActive ? 'var(--retro-text)' : '#141414',
                      color: isActive ? '#000000' : 'var(--retro-text)',
                      border: '2px solid var(--retro-border)',
                      borderLeft: isActive ? '8px solid var(--retro-accent)' : '2px solid var(--retro-border)',
                      padding: '8px 16px',
                      fontSize: '1.05rem',
                      letterSpacing: '2px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                    }}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CRT FILTER */}
          <div
            style={{
              background: 'var(--retro-card-bg)',
              borderLeft: '6px solid #333',
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              clipPath: 'polygon(0% 0%, 99% 4%, 100% 100%, 1% 96%)',
            }}
          >
            <span style={{ fontSize: '1.3rem', letterSpacing: '2px' }}>CRT FILTER</span>
            <button
              onClick={() => updateSettings({ crtEnabled: !settings.crtEnabled })}
              style={{
                background: settings.crtEnabled ? 'var(--retro-text)' : '#141414',
                color: settings.crtEnabled ? '#000000' : 'var(--retro-text)',
                border: '2px solid var(--retro-border)',
                borderLeft: settings.crtEnabled ? '8px solid var(--retro-accent)' : '2px solid var(--retro-border)',
                padding: '8px 20px',
                fontSize: '1.05rem',
                letterSpacing: '2px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {settings.crtEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Кнопка закрытия */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              background: 'var(--retro-accent)',
              color: 'var(--retro-text)',
              border: '2px solid var(--retro-accent)',
              padding: '12px 34px',
              fontSize: '1.15rem',
              letterSpacing: '3px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '6px 6px 0px #000',
              clipPath: 'polygon(0% 4%, 98% 0%, 100% 96%, 2% 100%)',
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}