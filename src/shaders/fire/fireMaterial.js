import * as THREE from 'three';

const fireVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fireFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;

    // Инвертируем UV, чтобы низ был основанием (0.0), а верх — кончиком (1.0)
    float fireHeight = (0.4 * uv.x);

    // Делаем форму костра сужающейся кверху
    float centerDist = abs(uv.x - 0.5);
    if (centerDist > 0.45 || fireHeight < 0.0) discard;

    // Активное движение шума вверх за счет uTime
    vec2 st = uv * vec2(10.0, 8.0);
    st.y -= uTime * 2.0; 

    float n = noise(st);
    
    // Интенсивность огня с сильным искажением от шума
    float flame = fireHeight - n * 0.35;
    
    // Яркие цвета пламени
    vec3 colDark = vec3(0.5, 0.1, 0.0);
    vec3 colMid = vec3(1.0, 0.4, 0.0);
    vec3 colLight = vec3(1.0, 0.9, 0.3);

    float intensity = flame * 1.8;
    vec3 finalColor = mix(colDark, colMid, clamp(intensity, 0.0, 1.0));
    finalColor = mix(finalColor, colLight, clamp(intensity - 1.0, 0.0, 1.0));

    // Прозрачность
    float alpha = smoothstep(0.0, 0.15, flame) * smoothstep(1.0, 0.2, uv.y);

    if (alpha < 0.05) discard;

    gl_FragColor = vec4(finalColor * 2.0, alpha);
  }
`;

export function createFireMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: fireVertexShader,
    fragmentShader: fireFragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}