import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Location } from './Location';
import {SkyDome} from "./SkyDome";
import { Character } from './Character';

export function CanvasContainer() {
    return (
        <Canvas style={{ width: '100vw', height: '100vh', background: '#111' }}>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={60} />
            <OrbitControls makeDefault />
            <SkyDome />

            {/* Базовое освещение */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} castShadow />

            {/* Загрузка асинхронных моделей */}
            <Suspense fallback={null}>
                <Location position={[0, 0, 0]} />
                <Character animationName="justSit" position={[0, 0, 0]}/>
            </Suspense>
        </Canvas>
    );
}