import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MainMenu } from './components/MainMenu';
import { GameCard } from './components/GameCard';
import { SettingsModal } from './components/SettingsModal';
import { RetroLoader } from './components/RetroLoader';
import { Scene } from './canvas/Scene';
import { useGameStore } from './store/useGameStore';
import { INTERACTABLES } from './data/interactables';

export function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const setIsPlaying = useGameStore((state) => state.setIsPlaying);
  const setCharacterAnimation = useGameStore((state) => state.setCharacterAnimation);
  const settings = useGameStore((state) => state.settings);


  const activeInteractable = useGameStore((state) => state.activeInteractable);
  const setActiveInteractable = useGameStore((state) => state.setActiveInteractable);
  const activeItem = INTERACTABLES.find((item) => item.id === activeInteractable) || null;

  const debugOrbit = useGameStore((state) => state.debugOrbit);
  const setDebugOrbit = useGameStore((state) => state.setDebugOrbit);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'OK',
    cancelText: null,
  });

  const handleCloseInteractable = () => {
    setActiveInteractable(null);
    setCharacterAnimation('Sitting');
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
      title: 'EXIT GAME',
      message: 'Вы действительно хотите вернуться в Windows?',
      onConfirm: () => {
        window.location.href = 'https://www.google.com';
      },
      confirmText: 'YES',
      cancelText: 'NO',
      onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
    });
  };

  const canvasDpr = settings.graphicsQuality === 'low' ? [0.75, 0.75] : [1, 1];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, background: '#000' }}>
      <RetroLoader />

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
        isOpen={Boolean(activeItem)}
        title={activeItem ? `${activeItem.step}. ${activeItem.title}` : ''}
        message={activeItem ? activeItem.description : ''}
        onConfirm={handleCloseInteractable}
        confirmText="BACK"
        cancelText={null}
      />

      {isPlaying && (
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: 10 }}>
          <button onClick={() => setCharacterAnimation('idle')}>Idle</button>
          <button onClick={() => setCharacterAnimation('Sitting')}>Sitting</button>
          <button onClick={() => setCharacterAnimation('SittingDisapproval')}>Disapproval</button>
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

      <Canvas
        style={{ width: '100vw', height: '100vh', background: '#111' }}
        dpr={canvasDpr}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;