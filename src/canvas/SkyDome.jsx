import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createSkyMaterial } from '../shaders/sky/skyMaterial';

export function SkyDome() {
  const meshRef = useRef();
  const skyMaterial = useMemo(() => createSkyMaterial(), []);

  // Обновляем время в шейдере каждый кадр
  useFrame((state) => {
    if (skyMaterial) {
      skyMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} material={skyMaterial} scale={[500, 500, 500]}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}