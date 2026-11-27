import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createFireMaterial } from '../shaders/fire/fireMaterial';
import { useGameStore } from '../store/useGameStore';

export function Fire({
  position = [0, 0, 0],
  lightColor = '#ff731c',
  lightIntensity = 2.6,
  lightDistance = 7.5,
  lightDecay = 2,
  flickerAmount = 0.65,
  lightOffset = [0, 0.25, 0],
}) {
  const materialRef = useRef();
  const meshRef = useRef();
  const lightRef = useRef();
  const graphicsQuality = useGameStore((state) => state.settings.graphicsQuality);

  const fireMaterial = useMemo(() => createFireMaterial(), []);

  useEffect(() => {
    return () => {
      if (fireMaterial && typeof fireMaterial.dispose === 'function') {
        fireMaterial.dispose();
      }
    };
  }, [fireMaterial]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }

    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }

    if (lightRef.current) {
      const wave =
        Math.sin(t * 7.3) * 0.45 +
        Math.sin(t * 13.7 + 1.4) * 0.3 +
        Math.cos(t * 21.1 + 0.7) * 0.25;

      const qualityMult = graphicsQuality === 'low' ? 0.85 : 1;
      lightRef.current.intensity = Math.max(
        0.2,
        (lightIntensity + wave * flickerAmount) * qualityMult
      );

      lightRef.current.position.set(
        position[0] + lightOffset[0] + Math.sin(t * 9.2) * 0.025,
        position[1] + lightOffset[1] + Math.cos(t * 11.4) * 0.03,
        position[2] + lightOffset[2] + Math.sin(t * 6.8 + 2.0) * 0.025
      );
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        renderOrder={999}
      >
        <planeGeometry args={[0.9, 1.8]} />
        <primitive object={fireMaterial} ref={materialRef} attach="material" />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[
          position[0] + lightOffset[0],
          position[1] + lightOffset[1],
          position[2] + lightOffset[2],
        ]}
        color={lightColor}
        intensity={lightIntensity}
        distance={lightDistance}
        decay={lightDecay}
      />
    </>
  );
}