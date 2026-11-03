import React, { Suspense } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Location } from './Location';
import { Character } from './Character';
import { SkyDome } from './SkyDome';
import { CameraController } from "./CameraController";
import { useGameStore } from '../store/useGameStore';

export function Scene() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const characterAnimation = useGameStore((state) => state.characterAnimation);

  return (
    <>
      <PerspectiveCamera makeDefault position={[-2, 0.09, 5]} fov={50} />

      {/* Управляем доступностью камеры через глобальный стейт */}
      <OrbitControls makeDefault enabled={isPlaying} />
      <CameraController targetName="Character" isEnabled={isPlaying} />
      <SkyDome />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      <Suspense fallback={null}>
        <Location position={[0, 0, 0]} />
        <Character animationName={characterAnimation} position={[-0.45, -.09, 0.3]} />
      </Suspense>
    </>
  );
}