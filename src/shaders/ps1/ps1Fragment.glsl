uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uHasTexture;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vec3 baseColor = uColor;
    float alpha = 1.0;

    if (uHasTexture > 0.5) {
        vec4 texColor = texture2D(uTexture, vUv);
        baseColor = texColor.rgb;
        alpha = texColor.a;
        
        // Отсечение полностью прозрачных пикселей (убирает артефакты на стыках)
        if (alpha < 0.4) discard;
    }

    // Менее агрессивная постеризация (32 уровня вместо 16 убирают "грязь")
    baseColor = floor(baseColor * 32.0) / 32.0;

    // Базовое освещение (Lambert) с мягким полутоном
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.75));
    float diff = max(dot(vNormal, lightDir), 0.35);

    gl_FragColor = vec4(baseColor * diff, alpha);
}