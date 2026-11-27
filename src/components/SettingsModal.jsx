import React from 'react';
import { useGameStore } from '../store/useGameStore';

const LABELS = {
  ru: {
    header: 'НАСТРОЙКИ',
    language: 'ЯЗЫК / LANGUAGE',
    graphics: 'КАЧЕСТВО ГРАФИКИ',
    low: 'НИЗКОЕ (PS1)',
    high: 'ВЫСОКОЕ',
    volume: 'ГРОМКОСТЬ',
    music: 'МУЗЫКА',
    on: 'ВКЛ',
    off: 'ВЫКЛ',
    crt: 'CRT ФИЛЬТР',
    close: 'ЗАКРЫТЬ',
  },
  en: {
    header: 'SETTINGS',
    language: 'LANGUAGE',
    graphics: 'GRAPHICS QUALITY',
    low: 'LOW (PS1)',
    high: 'HIGH',
    volume: 'MASTER VOLUME',
    music: 'MUSIC',
    on: 'ON',
    off: 'OFF',
    crt: 'CRT FILTER',
    close: 'CLOSE',
  },
};

export function SettingsModal({ isOpen, onClose }) {
  const settings = useGameStore((state) => state.settings);
  const updateSettings = useGameStore((state) => state.updateSettings);

  if (!isOpen) return null;

  const lang = settings.language || 'ru';
  const t = LABELS[lang] || LABELS.ru;

  const btnStyle = (active) => ({
    background: active ? 'var(--retro-accent)' : 'var(--retro-card-bg)',
    color: 'var(--retro-text)',
    border: '2px solid var(--retro-border)',
    padding: '6px 12px',
    fontSize: '0.85rem',
    letterSpacing: '1.5px',
    cursor: 'pointer',
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(420px, 92vw)',
          background: 'var(--retro-card-bg)',
          color: 'var(--retro-text)',
          border: '2px solid var(--retro-border)',
          borderLeft: '8px solid var(--retro-accent)',
          padding: '22px 24px',
          boxShadow: '8px 8px 0px #000',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '1.2rem', letterSpacing: '3px', borderBottom: '1px solid var(--retro-border)', paddingBottom: '10px' }}>
          {t.header}
        </div>

        {/* Выбор языка */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', letterSpacing: '1.5px' }}>{t.language}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => updateSettings({ language: 'ru' })}
              style={btnStyle(lang === 'ru')}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => updateSettings({ language: 'en' })}
              style={btnStyle(lang === 'en')}
            >
              EN
            </button>
          </div>
        </div>

        {/* Качество графики */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', letterSpacing: '1.5px' }}>{t.graphics}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => updateSettings({ graphicsQuality: 'low' })}
              style={btnStyle(settings.graphicsQuality === 'low')}
            >
              {t.low}
            </button>
            <button
              type="button"
              onClick={() => updateSettings({ graphicsQuality: 'high' })}
              style={btnStyle(settings.graphicsQuality === 'high')}
            >
              {t.high}
            </button>
          </div>
        </div>

        {/* Громкость */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', letterSpacing: '1.5px' }}>
            {t.volume}: {Math.round(settings.masterVolume * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.masterVolume}
            onChange={(e) => updateSettings({ masterVolume: Number(e.target.value) })}
            style={{ accentColor: 'var(--retro-accent)', cursor: 'pointer' }}
          />
        </div>

        {/* Музыка */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', letterSpacing: '1.5px' }}>{t.music}</span>
          <button
            type="button"
            onClick={() => updateSettings({ musicMuted: !settings.musicMuted })}
            style={btnStyle(!settings.musicMuted)}
          >
            {settings.musicMuted ? t.off : t.on}
          </button>
        </div>

        {/* CRT фильтр */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', letterSpacing: '1.5px' }}>{t.crt}</span>
          <button
            type="button"
            onClick={() => updateSettings({ crtEnabled: !settings.crtEnabled })}
            style={btnStyle(settings.crtEnabled)}
          >
            {settings.crtEnabled ? t.on : t.off}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="button" onClick={onClose} style={btnStyle(true)}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}