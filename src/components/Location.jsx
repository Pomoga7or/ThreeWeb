// import React from 'react';
// import { useGLTF } from '@react-three/drei';

// export function Location(props) {
//   const { scene } = useGLTF('/models/location.glb');
//   return <primitive object={scene} {...props} />;
// }

// // Предзагрузка модели для ускорения рендеринга
// useGLTF.preload('/models/location.glb');

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { createPS1Material } from '../shaders/ps1/ps1Material';

export function Location(props) {
    const { scene } = useGLTF('/models/location.glb');

    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);

        clone.traverse((child) => {
            if (child.isMesh) {
                const mat = child.material;
                const hasTex = mat.map ? 1.0 : 0.0;
                const color = mat.color ? [mat.color.r, mat.color.g, mat.color.b] : [0.8, 0.8, 0.8];

                // Создаем материал через фабричную функцию
                child.material = createPS1Material({
                    uTexture: mat.map || new THREE.Texture(),
                    uHasTexture: hasTex,
                    uColor: new THREE.Color(...color),
                    uResolution: new THREE.Vector2(340.0, 340.0), // Попробуй уменьшить до vec2(160.0, 120.0) для жесткого ретро
                });
            }
        });

        return clone;
    }, [scene]);

    return <primitive object={clonedScene} {...props} />;
}

useGLTF.preload('/models/location.glb');