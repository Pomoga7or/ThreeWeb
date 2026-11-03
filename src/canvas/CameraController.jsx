import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export function CameraController({ targetPosition, targetName, isEnabled = true }) {
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);
  const targetVec = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // 1. Если передали имя модели — ищем её в сцене и берем мировые координаты
    if (targetName) {
      const targetObject = scene.getObjectByName(targetName);
      if (targetObject) {
        targetObject.getWorldPosition(targetVec.current);
      }
    } 
    // 2. Если передали явные координаты [x, y, z]
    else if (targetPosition) {
      targetVec.current.set(...targetPosition);
    }

    // Плавный lerp точки фокуса камеры к целевой позиции
    controlsRef.current.target.lerp(targetVec.current, delta * 5);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={isEnabled}
      minDistance={1}
      maxDistance={25}
    />
  );
}