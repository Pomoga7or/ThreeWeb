import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MainMenu } from './components/MainMenu';
import { Scene } from './canvas/Scene';
import { useGameStore } from './store/useGameStore';

export function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const setIsPlaying = useGameStore((state) => state.setIsPlaying);
  const setCharacterAnimation = useGameStore((state) => state.setCharacterAnimation);

  const handleStart = () => {
    setIsPlaying(true);
    setCharacterAnimation('Sitting'); // Переключаем анимацию при старте
  };

  const handleSettings = () => {
    alert('Панель настроек откроется здесь...');
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div style={{ width: '100vw', height: '100vw', overflow: 'hidden', margin: 0, padding: 0, background: '#000' }}>

      {/* UI Меню */}
      {!isPlaying && (
        <MainMenu
          onStart={handleStart}
          onSettings={handleSettings}
          onExit={handleExit}
        />
      )}

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
        // Ограничиваем Pixel Ratio от 1 до 2, чтобы слабые телефоны не рендерили в 3x-4x
        dpr={[1, 2]}
        // Включаем производительный режим теней
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>

    </div>
  );
}

export default App;