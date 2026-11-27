import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MainMenu } from './components/MainMenu';
import { GameCard } from './components/GameCard';
import { SettingsModal } from './components/SettingsModal';
import { RetroLoader } from './components/RetroLoader';
import { Scene } from './canvas/Scene';
import { useGameStore } from './store/useGameStore';
import { INTERACTABLES, UI_TEXT } from './data/interactables';
import { CharacterDialogue } from './components/CharacterDialogue';

export function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const setIsPlaying = useGameStore((state) => state.setIsPlaying);
  const setCharacterAnimation = useGameStore((state) => state.setCharacterAnimation);
  const settings = useGameStore((state) => state.settings);

  const activeInteractable = useGameStore((state) => state.activeInteractable);
  const setActiveInteractable = useGameStore((state) => state.setActiveInteractable);

  const debugOrbit = useGameStore((state) => state.debugOrbit);
  const setDebugOrbit = useGameStore((state) => state.setDebugOrbit);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const lang = settings.language || 'ru';
  const t = UI_TEXT[lang] || UI_TEXT.ru;

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'OK',
    cancelText: null,
  });

  const handleSelectInteractable = (item) => {
    setActiveInteractable(item.id);
    if (item.characterAnim) {
      setCharacterAnimation(item.characterAnim);
    }
  };

  const handleResetOverview = () => {
    setActiveInteractable(null);
    setCharacterAnimation('Sitting');
  };

  const handleBackToAbout = () => {
    if (!activeInteractable) return;

    if (activeInteractable === 'about') {
      handleResetOverview();
      return;
    }

    const aboutItem = INTERACTABLES.find((item) => item.id === 'about');
    setActiveInteractable('about');
    if (aboutItem?.characterAnim) {
      setCharacterAnimation(aboutItem.characterAnim);
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    setCharacterAnimation('Sitting');
  };

  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleExit = () => {
    setModalConfig({
      isOpen: true,
      title: t.exitTitle,
      message: t.exitMessage,
      onConfirm: () => {
        window.location.href = 'https://www.google.com';
      },
      confirmText: t.yes,
      cancelText: t.no,
      onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
    });
  };

  const canvasDpr = settings.graphicsQuality === 'low' ? [0.75, 0.75] : [1, 1];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, background: '#000' }}>
      <RetroLoader />

      {/* Постоянная верхняя левая панель: кнопка настроек всегда доступна */}
      <div
        style={{
          position: 'fixed',
          top: '18px',
          left: '20px',
          zIndex: 2500,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'auto',
        }}
      >
        <button
          onClick={handleSettings}
          style={{
            background: isSettingsOpen ? 'var(--retro-accent)' : 'var(--retro-card-bg)',
            color: 'var(--retro-text)',
            border: '2px solid var(--retro-border)',
            borderLeft: '6px solid var(--retro-accent)',
            padding: '8px 14px',
            fontSize: '0.85rem',
            letterSpacing: '1.5px',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #000',
          }}
        >
          {t.settings}
        </button>

        {isPlaying && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCharacterAnimation('idle')}>Idle</button>
            <button onClick={() => setCharacterAnimation('Sitting')}>Sitting</button>
            <button onClick={() => setCharacterAnimation('SittingDisapproval')}>Disapproval</button>
          </div>
        )}
      </div>

      {!isPlaying && (
        <MainMenu
          onStart={handleStart}
          onSettings={handleSettings}
          onExit={handleExit}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <GameCard
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onClose={modalConfig.onClose}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
      />

      {isPlaying && (
        <div
          style={{
            position: 'fixed',
            bottom: '18px',
            left: '20px',
            zIndex: 2400,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            pointerEvents: 'auto',
          }}
        >
          {activeInteractable && (
            <button
              type="button"
              onClick={handleBackToAbout}
              style={{
                background: 'var(--retro-card-bg)',
                color: 'var(--retro-text)',
                border: '2px solid var(--retro-border)',
                borderLeft: '6px solid var(--retro-accent)',
                padding: '8px 12px',
                fontSize: '0.85rem',
                letterSpacing: '1.5px',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px #000',
              }}
            >
              {lang === 'en' ? 'BACK' : 'НАЗАД'}
            </button>
          )}

          <button
            onClick={handleResetOverview}
            style={{
              background: !activeInteractable ? 'var(--retro-accent)' : 'var(--retro-card-bg)',
              color: 'var(--retro-text)',
              border: '2px solid var(--retro-border)',
              padding: '8px 12px',
              fontSize: '0.85rem',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            {t.overview}
          </button>

          {INTERACTABLES.map((item) => {
            const isSelected = activeInteractable === item.id;
            const itemTitle = item.title?.[lang] || item.title?.ru || item.title;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectInteractable(item)}
                style={{
                  background: isSelected ? 'var(--retro-accent)' : 'var(--retro-card-bg)',
                  color: 'var(--retro-text)',
                  border: '2px solid var(--retro-border)',
                  borderLeft: isSelected ? '8px solid var(--retro-text)' : '6px solid var(--retro-accent)',
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px #000',
                }}
              >
                {item.step}. {itemTitle}
              </button>
            );
          })}
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          bottom: '18px',
          right: '20px',
          zIndex: 2500,
          display: 'flex',
          gap: '8px',
          pointerEvents: 'auto',
        }}
      >
        <button
          onClick={() => setDebugOrbit(!debugOrbit)}
          style={{
            background: debugOrbit ? 'var(--retro-accent)' : 'var(--retro-card-bg)',
            color: 'var(--retro-text)',
            border: '2px solid var(--retro-border)',
            borderLeft: debugOrbit ? '8px solid var(--retro-text)' : '6px solid var(--retro-accent)',
            padding: '8px 14px',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #000',
          }}
        >
          {debugOrbit ? 'ORBIT: ON' : 'ORBIT: OFF'}
        </button>

        {debugOrbit && (
          <button
            onClick={() => window.dispatchEvent(new Event('debug:log-camera'))}
            style={{
              background: 'var(--retro-card-bg)',
              color: 'var(--retro-text)',
              border: '2px solid var(--retro-border)',
              padding: '8px 12px',
              fontSize: '0.9rem',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            LOG POS
          </button>
        )}
      </div>

      {settings.crtEnabled && <div className="crt-overlay" />}
      <CharacterDialogue
        isOpen={isPlaying && activeInteractable === 'about'}
        onClose={handleResetOverview}
        onSelectLocation={(targetId) => {
          const found = INTERACTABLES.find((entry) => entry.id === targetId);
          if (found) {
            handleSelectInteractable(found);
          }
        }}
      />
      <Canvas
        style={{ width: '100vw', height: '100vh', background: '#111' }}
        dpr={canvasDpr}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;