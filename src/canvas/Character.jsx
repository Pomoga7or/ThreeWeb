import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterAnimations } from '../hooks/useCharacterAnimation';
import { CharacterMarker } from './CharacterMarker';

const CHARACTER_PATH = `${import.meta.env.BASE_URL}models/characterNotOpimized.glb`;

export function Character({
  animationName = 'idle',
  showMarker = false,
  markerOffset = [0, 1.35, 0],
  onMarkerClick,
  ...props
}) {
  const { scene, animations } = useGLTF(CHARACTER_PATH);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

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

  const { playAnimation, updateMixer } = useCharacterAnimations(animations, scene);

  useEffect(() => {
    if (animationName) {
      playAnimation(animationName, 0.3);
    }
  }, [animationName, playAnimation]);

  useFrame((_, delta) => {
    updateMixer(delta);
  });

  return (
    <group name="Character" {...props}>
      <primitive object={scene} />
      <CharacterMarker
        position={markerOffset}
        visible={showMarker}
        onClick={onMarkerClick}
      />
    </group>
  );
}

useGLTF.preload(CHARACTER_PATH);