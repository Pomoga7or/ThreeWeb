import * as THREE from 'three';

const fireVertexShader = `
  varying vec2 vUv;
  void main() {
    // Инвертируем UV по вертикали прямо на уровне геометрии
    vUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fireFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec2 hash( vec2 p ) {
      p = vec2( dot(p,vec2(127.1,311.7)),
               dot(p,vec2(269.5,183.3)) );
      return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }

  float noise( in vec2 p ) {
      const float K1 = 0.366025404;
      const float K2 = 0.211324865;
      vec2 i = floor( p + (p.x+p.y)*K1 );
      vec2 a = p - i + (i.x+i.y)*K2;
      vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
      vec2 b = a - o + K2;
      vec2 c = a - 1.0 + 2.0*K2;
      vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
      vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
      return dot( n, vec3(70.0) );
  }

  float fbm(vec2 uv) {
      float f;
      mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
      f  = 0.5000*noise( uv ); uv = m*uv;
      f += 0.2500*noise( uv ); uv = m*uv;
      f += 0.1250*noise( uv ); uv = m*uv;
      f += 0.0625*noise( uv ); uv = m*uv;
      f = 0.5 + 0.5*f;
      return f;
  }

  void main() {
      vec2 uv = vUv;
      vec2 q = uv;
      
      q.x = (q.x - 0.5) * 2.0; 
      q.y *= 2.0;
      
      // Направление движения вверх через минус время
      float T3 = -uTime * 4.5;
      q.y -= 0.25;
      
      // Возвращаем проверенную формулу силуэта без ломающих изменений
      float n = fbm(q * 4.5 - vec2(0.0, T3));
      float c = 1. - 16. * pow( max( 0., length(q * vec2(1.2 + q.y * 0.5, .75)) - n * max( 0., q.y + .25 ) ), 1.2 );
      float c1 = n * c * (1.5 - pow(2.50 * uv.y, 4.));
      c1 = clamp(c1, 0., 1.);

      vec3 col = vec3(1.5 * c1, 1.5 * c1 * c1 * c1, c1 * c1 * c1 * c1 * c1 * c1);
      float a = c * (1. - pow(uv.y, 3.));
      
      if (a < 0.02) discard;

      gl_FragColor = vec4(col, a);
  }
`;

export function createFireMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: fireVertexShader,
    fragmentShader: fireFragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(512, 512) },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}