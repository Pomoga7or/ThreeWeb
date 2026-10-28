import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { Location } from './components/Location';
import { Character } from './components/Character';
import { SkyDome } from './components/SkyDome';
import { MainMenu } from './components/MainMenu';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Управляем анимацией персонажа через стейт (например, в меню 'idle', а при старте 'Sitting')
  const [characterAnimation, setCharacterAnimation] = useState('idle');

  const handleStart = () => {
    setIsPlaying(true);
    setCharacterAnimation('Sitting'); // При нажатии «Старт» переключаем анимацию
  };

  const handleSettings = () => {
    alert('Настройки звука и графики в разработке...');
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, background: '#000' }}>
      
      {/* Главное меню */}
      {!isPlaying && (
        <MainMenu 
          onStart={handleStart} 
          onSettings={handleSettings} 
          onExit={handleExit} 
        />
      )}

      {/* Пример дополнительной панели управления анимациями прямо в игре (опционально) */}
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          display: 'flex',
          gap: '10px'
        }}>
          <button onClick={() => setCharacterAnimation('idle')}>Idle</button>
          <button onClick={() => setCharacterAnimation('Sitting')}>Sitting</button>
          <button onClick={() => setCharacterAnimation('SittingDisapproval')}>Disapproval</button>
        </div>
      )}

      {/* Основная 3D сцена на фоне */}
      <Canvas style={{ width: '100vw', height: '100vh', background: '#111' }}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={60} />
        
        {/* Блокируем OrbitControls, пока isPlaying === false (меню открыто) */}
        <OrbitControls 
          makeDefault 
          enabled={isPlaying} 
        />

        {/* Закат и облака */}
        <SkyDome />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />

        <Suspense fallback={null}>
          <Location position={[0, 0, 0]} />
          
          {/* Передаем динамический проп анимации в Character */}
          <Character 
            animationName={characterAnimation} 
            position={[0, 0, 0]} 
          />
        </Suspense>
      </Canvas>

    </div>
  );
}

export default App;