import React, { useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { KTX2Loader } from 'three-stdlib';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { createPS1Material } from '../shaders/ps1/ps1Material';
import { useGameStore } from '../store/useGameStore';

export function InteractiveModel({ item, onSelect }) {
  const gl = useThree((state) => state.gl);
  const graphicsQuality = useGameStore((state) => state.settings.graphicsQuality);
  const [hovered, setHovered] = useState(false);

  const { scene } = useGLTF(item.modelPath, undefined, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(`${import.meta.env.BASE_URL}basis/`);
    ktx2Loader.detectSupport(gl);
    loader.setKTX2Loader(ktx2Loader);
  });

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const res =
      graphicsQuality === 'low'
        ? new THREE.Vector2(200.0, 200.0)
        : new THREE.Vector2(340.0, 340.0);

    clone.traverse((child) => {
      if (child.isMesh) {
        const mat = child.material;
        if (mat?.map) {
          mat.map.generateMipmaps = false;
          mat.map.minFilter = THREE.NearestFilter;
          mat.map.magFilter = THREE.NearestFilter;
          mat.map.needsUpdate = true;
        }

        const hasTex = mat?.map ? 1.0 : 0.0;
        const baseColor = mat?.color
          ? new THREE.Color(mat.color.r, mat.color.g, mat.color.b)
          : new THREE.Color(0.8, 0.8, 0.8);

        if (hovered) {
          baseColor.offsetHSL(0, 0.15, 0.12);
        }

        child.material = createPS1Material({
          uTexture: mat?.map || new THREE.Texture(),
          uHasTexture: hasTex,
          uColor: baseColor,
          uResolution: res,
        });
      }
    });

    return clone;
  }, [scene, graphicsQuality, hovered]);

  return (
    <group
      name={`interactable_${item.id}`}
      position={item.position}
      rotation={item.rotation}
      scale={item.scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );
}