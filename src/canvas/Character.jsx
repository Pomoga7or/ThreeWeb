import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterAnimations } from '../hooks/useCharacterAnimation';

export function Character({ animationName = 'idle', ...props }) {
    const { scene, animations } = useGLTF('/models/character.glb');

    // Настраиваем PS1-фильтрацию текстур прямо на оригинальной сцене модели
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
    
    // Подключаем наш гибкий хук управления анимациями
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

// useGLTF.preload('/models/character.glb');
useGLTF.preload('/models/character.glb', undefined, (loader) => {
  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath('/basis/'); // Укажи путь к папке с бинарниками basis из three/examples
  ktx2Loader.detectSupport(renderer); // Нужен доступ к WebGLRenderer
  loader.setKTX2Loader(ktx2Loader);
});