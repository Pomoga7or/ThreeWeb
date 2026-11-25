import React, { useMemo, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { KTX2Loader } from 'three-stdlib';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { createPS1Material } from '../shaders/ps1/ps1Material';
import { Fire } from './Fire';
import { useGameStore } from '../store/useGameStore';

// Безопасный абсолютный путь с учетом префикса репозитория
const MODEL_PATH = `${import.meta.env.BASE_URL}models/location.glb`;

export function Location(props) {
    const gl = useThree((state) => state.gl);
    const graphicsQuality = useGameStore((state) => state.settings.graphicsQuality);

    // Подключаем MeshoptDecoder через callback-функцию загрузчика
    const { scene } = useGLTF(MODEL_PATH, undefined, (loader) => {
        loader.setMeshoptDecoder(MeshoptDecoder);

        const ktx2Loader = new KTX2Loader();
        ktx2Loader.setTranscoderPath(`${import.meta.env.BASE_URL}basis/`);
        ktx2Loader.detectSupport(gl);
        loader.setKTX2Loader(ktx2Loader);
    });

    const [firePosition, setFirePosition] = useState(null);

    const { clonedScene, foundFirePos } = useMemo(() => {
        const clone = scene.clone(true);
        let lastFirePos = null;

        const ps1Resolution =
            graphicsQuality === 'low'
                ? new THREE.Vector2(200.0, 200.0)
                : new THREE.Vector2(340.0, 340.0);

        clone.traverse((child) => {
            if (child.isMesh) {
                const mat = child.material;
                const meshName = child.name ? child.name.toLowerCase() : '';

                if (meshName.includes('firebarrel')) {
                    child.name = 'fireBarrel'; // Принудительное имя для глобального поиска

                    const box = new THREE.Box3().setFromObject(child);
                    const center = new THREE.Vector3();
                    box.getCenter(center);

                    lastFirePos = [center.x, box.max.y - 0.2, center.z];
                }

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
                    uResolution: ps1Resolution,
                });
            }
        });

        return { clonedScene: clone, foundFirePos: lastFirePos };
    }, [scene, graphicsQuality]);

    useEffect(() => {
        setFirePosition(foundFirePos);
    }, [foundFirePos]);

    useEffect(() => {
        return () => {
            clonedScene.traverse((child) => {
                if (child.isMesh && child.material && typeof child.material.dispose === 'function') {
                    child.material.dispose();
                }
            });
        };
    }, [clonedScene]);

    return (
        <group {...props}>
            <primitive object={clonedScene} />
            {firePosition && (
                <Fire position={firePosition} scale={[0.6, 1.0, 0.6]} />
            )}
        </group>
    );
}

// Корректная предзагрузка с поддержкой MeshoptDecoder
useGLTF.preload(MODEL_PATH, undefined, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
});