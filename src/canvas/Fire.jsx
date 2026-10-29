import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { createFireMaterial } from '../shaders/fire/fireMaterial';

export function Fire({ position = [0, 0, 0] }) {
    const materialRef = useRef();
    const meshRef = useRef();

    useFrame(({ clock, camera }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
        
        if (meshRef.current) {
            // Поворачиваем строго лицом к камере
            meshRef.current.lookAt(camera.position);
        }
    });

    return (
        <mesh 
            ref={meshRef} 
            position={position}
            renderOrder={999}
        >
            <planeGeometry args={[0.9, 1.8]} />
            <primitive object={createFireMaterial()} ref={materialRef} attach="material" />
        </mesh>
    );
}