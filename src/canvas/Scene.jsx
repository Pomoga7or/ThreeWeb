import React, { Suspense } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Location } from './Location';
import { Character } from './Character';
import { SkyDome } from './SkyDome';
import { useGameStore } from '../store/useGameStore';

export function Scene() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const characterAnimation = useGameStore((state) => state.characterAnimation);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={60} />
      
      {/* Управляем доступностью камеры через глобальный стейт */}
      <OrbitControls makeDefault enabled={isPlaying} />

      <SkyDome />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      <Suspense fallback={null}>
        <Location position={[0, 0, 0]} />
        <Character animationName={characterAnimation} position={[0, 0, 0]} />
      </Suspense>
    </>
  );
}