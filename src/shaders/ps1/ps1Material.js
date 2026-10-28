import * as THREE from 'three';
import vertexShader from './ps1Vertex.glsl';
import fragmentShader from './ps1Fragment.glsl';

export function createPS1Material(parameters = {}) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: parameters.uTexture || new THREE.Texture() },
      uHasTexture: { value: parameters.uHasTexture !== undefined ? parameters.uHasTexture : 0.0 },
      uColor: { value: parameters.uColor || new THREE.Color(0.8, 0.8, 0.8) },
      // Передаем Vector2: чем меньше цифры, тем сильнее «квадратная» ретро-сетка (например, vec2(160.0, 120.0))
      uResolution: { value: parameters.uResolution || new THREE.Vector2(320.0, 240.0) },
    },
    side: THREE.DoubleSide,
    transparent: true,
  });
}