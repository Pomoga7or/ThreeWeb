import * as THREE from 'three';
import vertexShader from './skyVertex.glsl';
import fragmentShader from './skyFragment.glsl';

export function createSkyMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
    },
    side: THREE.BackSide,
    depthWrite: false,
  });
}