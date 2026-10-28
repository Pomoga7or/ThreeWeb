import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCharacterAnimations } from '../hooks/useCharacterAnimation';

export function Character({ animationName = 'idle', ...props }) {
    const { scene, animations } = useGLTF('/models/character.glb');
    
    // Подключаем наш гибкий хук
    const { playAnimation, updateMixer } = useCharacterAnimations(animations, scene);

    // Синхронизируем изменение пропса animationName с контроллером
    useEffect(() => {
        if (animationName) {
            playAnimation(animationName, 0.3);
        }
    }, [animationName, playAnimation]);

    // Тикаем миксер каждый кадр
    useFrame((state, delta) => {
        updateMixer(delta);
    });

    return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/character.glb');