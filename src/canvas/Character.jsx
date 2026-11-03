import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterAnimations } from '../hooks/useCharacterAnimation';

const CHARACTER_PATH = `${import.meta.env.BASE_URL}models/characterNotOpimized.glb`;

export function Character({ animationName = 'idle', ...props }) {
    const { scene, animations } = useGLTF(CHARACTER_PATH);
    
    // Настраиваем PS1-фильтрацию текстур прямо на оригинальной сцене
    useEffect(() => {
        if (!scene) return;

        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];

                materials.forEach((mat) => {
                    if (mat.map) {
                        mat.map.generateMipmaps = false;
                        mat.map.minFilter = THREE.NearestFilter;
                        mat.map.magFilter = THREE.NearestFilter;
                        mat.map.needsUpdate = true;
                    }
                });
            }
        });
    }, [scene]);

    // Подключаем хук управления анимациями
    const { playAnimation, updateMixer } = useCharacterAnimations(animations, scene);

    // Запускаем анимацию только при изменении её имени
    useEffect(() => {
        if (animationName) {
            playAnimation(animationName, 0.3);
        }
    }, [animationName, playAnimation]);

    // Тикаем миксер каждый кадр
    useFrame((state, delta) => {
        updateMixer(delta);
    });

    return (
        <group name="Character" {...props}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload(CHARACTER_PATH);