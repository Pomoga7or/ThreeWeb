uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 clipPosition = projectionMatrix * mvPosition;

    if (clipPosition.w != 0.0) {
        clipPosition.xyz /= clipPosition.w;
        
        // Квантование отдельно по осям X и Y (эмуляция низкого разрешения)
        clipPosition.xy = floor(clipPosition.xy * uResolution) / uResolution;
        
        clipPosition.xyz *= clipPosition.w;
    }

    gl_Position = clipPosition;
}