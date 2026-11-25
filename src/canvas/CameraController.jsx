import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store/useGameStore';

const DEFAULT_POS = [-2, 0.02, 3];
const DEFAULT_LOOK_AT = [-0.45, 0.15, 0.3];
const WORLD_UP = new THREE.Vector3(0, 1, 0);

export function CameraController({
  targetPos = DEFAULT_POS,
  targetLookAt = DEFAULT_LOOK_AT,
  parallax = 0.08,
  minFloorY = -0.35,
  isEnabled = true,
  isFocused = false,
}) {
  const controlsRef = useRef();
  const { camera, pointer } = useThree();
  const debugOrbit = useGameStore((state) => state.debugOrbit);

  const desiredPos = useRef(new THREE.Vector3(...DEFAULT_POS));
  const desiredLookAt = useRef(new THREE.Vector3(...DEFAULT_LOOK_AT));
  const currentLookAt = useRef(new THREE.Vector3(...DEFAULT_LOOK_AT));
  const goalPos = useRef(new THREE.Vector3(...DEFAULT_POS));

  useEffect(() => {
    if (Array.isArray(targetPos) && targetPos.length === 3) {
      desiredPos.current.set(targetPos[0], targetPos[1], targetPos[2]);
    }
  }, [targetPos[0], targetPos[1], targetPos[2]]);

  useEffect(() => {
    if (Array.isArray(targetLookAt) && targetLookAt.length === 3) {
      desiredLookAt.current.set(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
    }
  }, [targetLookAt[0], targetLookAt[1], targetLookAt[2]]);

  useEffect(() => {
    if (!debugOrbit && controlsRef.current) {
      currentLookAt.current.copy(controlsRef.current.target);
    }
  }, [debugOrbit]);

  useEffect(() => {
    const onLogCamera = () => {
      const pos = camera.position.toArray().map((n) => Number(n.toFixed(3)));
      const tgt = controlsRef.current
        ? controlsRef.current.target.toArray().map((n) => Number(n.toFixed(3)))
        : currentLookAt.current.toArray().map((n) => Number(n.toFixed(3)));

      console.log('[Camera Debug]', {
        cameraPos: pos,
        cameraLookAt: tgt,
      });
    };

    window.addEventListener('debug:log-camera', onLogCamera);
    return () => window.removeEventListener('debug:log-camera', onLogCamera);
  }, [camera]);

  useFrame((_, delta) => {
    if (!isEnabled || debugOrbit) return;

    const step = Math.min(1, delta * 6);

    if (isFocused) {
      goalPos.current.copy(desiredPos.current);
    } else {
      goalPos.current.set(
        desiredPos.current.x + pointer.x * parallax,
        desiredPos.current.y + pointer.y * parallax,
        desiredPos.current.z
      );
    }

    if (goalPos.current.y < minFloorY) {
      goalPos.current.y = minFloorY;
    }

    camera.position.lerp(goalPos.current, step);
    if (camera.position.distanceTo(goalPos.current) < 0.001) {
      camera.position.copy(goalPos.current);
    }

    currentLookAt.current.lerp(desiredLookAt.current, step);
    if (currentLookAt.current.distanceTo(desiredLookAt.current) < 0.001) {
      currentLookAt.current.copy(desiredLookAt.current);
    }

    camera.up.copy(WORLD_UP);
    camera.lookAt(currentLookAt.current);

    if (controlsRef.current) {
      controlsRef.current.target.copy(currentLookAt.current);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={debugOrbit}
      target={DEFAULT_LOOK_AT}
      maxPolarAngle={Math.PI * 0.48}
      minDistance={0.1}
      maxDistance={30}
    />
  );
}