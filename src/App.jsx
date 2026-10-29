import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MainMenu } from './components/MainMenu';
import { GameCard } from './components/GameCard';
import { Scene } from './canvas/Scene';
import { useGameStore } from './store/useGameStore';

export function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const setIsPlaying = useGameStore((state) => state.setIsPlaying);
  const setCharacterAnimation = useGameStore((state) => state.setCharacterAnimation);

  // Стейт для управления кастомной ретро-карточкой вместо стандартного alert
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'OK',
    cancelText: null,
  });

  const handleStart = () => {
    setIsPlaying(true);
    setCharacterAnimation('Sitting'); // Переключаем анимацию при старте
  };

  const handleSettings = () => {
    setModalConfig({
      isOpen: true,
      title: 'OPTIONS',
      message: 'Панель настроек находится в разработке.',
      onConfirm: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      confirmText: 'CLOSE',
      cancelText: null,
    });
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

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, background: '#000' }}>

      {/* UI Главное Меню */}
      {!isPlaying && (
        <MainMenu
          onStart={handleStart}
          onSettings={handleSettings}
          onExit={handleExit}
        />
      )}

      {/* Кастомная ретро-карточка (вместо alert) */}
      <GameCard
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onClose={modalConfig.onClose}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
      />

      {/* Опциональные кнопки управления анимацией прямо во время игры */}
      {isPlaying && (
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: 10 }}>
          <button onClick={() => setCharacterAnimation('idle')}>Idle</button>
          <button onClick={() => setCharacterAnimation('Sitting')}>Sitting</button>
          <button onClick={() => setCharacterAnimation('SittingDisapproval')}>Disapproval</button>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        style={{ width: '100vw', height: '100vh', background: '#111' }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>

    </div>
  );
}

export default App;