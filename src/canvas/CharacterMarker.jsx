import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createVolumetricMarkerMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color('#99fd47') },
      uAccentColor: { value: new THREE.Color('#ff2a2a') },
    },
    vertexShader: `
      uniform float uTime;
      varying vec3 vNormalView;
      varying vec3 vViewPos;

      void main() {
        vec3 pos = position;
        float stepTime = floor(uTime * 12.0) / 12.0;
        pos += normal * (sin(stepTime * 6.0 + pos.y * 10.0) * 0.004);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPos = -mvPosition.xyz;
        vNormalView = normalize(normalMatrix * normal);

        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uBaseColor;
      uniform vec3 uAccentColor;
      varying vec3 vNormalView;
      varying vec3 vViewPos;

      void main() {
        vec3 n = normalize(vNormalView);
        vec3 viewDir = normalize(vViewPos);

        vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
        float ndotl = dot(n, lightDir);
        float shade = ndotl > 0.35 ? 1.15 : (ndotl > -0.15 ? 0.85 : 0.58);

        float rim = 1.0 - max(dot(n, viewDir), 0.0);
        float rimMask = smoothstep(0.55, 0.92, rim);

        float pulse = 0.9 + 0.1 * sin(uTime * 4.5);
        vec3 col = uBaseColor * shade * pulse;
        col = mix(col, uAccentColor, rimMask * 0.35);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

export function CharacterMarker({
  position = [0, 1.2, 0],
  visible = true,
  onClick,
}) {
  const groupRef = useRef();
  const spinRef = useRef();

  const material = useMemo(() => createVolumetricMarkerMaterial(), []);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame(({ clock }) => {
    if (!visible) return;
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 3.4) * 0.07;
    }

    if (spinRef.current) {
      spinRef.current.rotation.y = t * 1.6;
    }

    material.uniforms.uTime.value = t;
  });

  if (!visible) return null;

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      <group ref={spinRef}>
        {/* Верхний вытянутый стержень восклицательного знака */}
        <mesh
          position={[0, 0.1, 0]}
          scale={[0.85, 2.35, 0.65]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.07, 0.1, 0.07]} />
          <primitive object={material} attach="material" />
        </mesh>

        {/* Нижняя точка восклицательного знака */}
        <mesh
          position={[0, -0.09, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.06, 0.06, 0.05]} />
          <primitive object={material} attach="material" />
        </mesh>
      </group>
    </group>
  );
}