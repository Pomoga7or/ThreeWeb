import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPS1Material } from '../shaders/ps1/ps1Material';
import { createFireMaterial } from '../shaders/fire/fireMaterial';

export function Location(props) {
    const { scene } = useGLTF('/models/location.glb');
    
    // Храним ссылки на материалы огня, чтобы обновлять время в кадре
    const fireMaterialsRef = useRef([]);

    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);
        fireMaterialsRef.current = [];

        clone.traverse((child) => {
            if (child.isMesh) {
                const mat = child.material;
                const meshName = child.name ? child.name.toLowerCase() : '';
                const matName = mat?.name ? mat.name.toLowerCase() : '';

                // Если это огонь из Blender (fire1, fire2, Fire_Mat)
                const isFire = meshName.includes('fire') || matName.includes('fire_mat');

                if (isFire) {
                    const fireMat = createFireMaterial();
                    fireMaterialsRef.current.push(fireMat);
                    child.material = fireMat;
                    return;
                }

                // Для остальных элементов локации — стандартный PS1-шейдер
                if (mat.map) {
                    mat.map.generateMipmaps = false;
                    mat.map.minFilter = THREE.NearestFilter;
                    mat.map.magFilter = THREE.NearestFilter;
                    mat.map.needsUpdate = true;
                }

                const hasTex = mat.map ? 1.0 : 0.0;
                const color = mat.color ? [mat.color.r, mat.color.g, mat.color.b] : [0.8, 0.8, 0.8];

                child.material = createPS1Material({
                    uTexture: mat.map || new THREE.Texture(),
                    uHasTexture: hasTex,
                    uColor: new THREE.Color(...color),
                    uResolution: new THREE.Vector2(340.0, 340.0),
                });
            }
        });

        return clone;
    }, [scene]);

    // Обновляем таймер анимации огня каждый кадр
    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        fireMaterialsRef.current.forEach((mat) => {
            if (mat.uniforms && mat.uniforms.uTime) {
                mat.uniforms.uTime.value = elapsedTime;
            }
        });
    });

    return <primitive object={clonedScene} {...props} />;
}

useGLTF.preload('/models/location.glb');