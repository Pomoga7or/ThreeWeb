uniform float uTime;
varying vec3 vWorldPosition;

// Простая функция псевдослучайного шума для облаков
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
    vec3 normPos = normalize(vWorldPosition);
    float v = normPos.y; 

    // Рисуем небо только выше горизонта (где v > 0.0)
    if (v < 0.0) {
        gl_FragColor = vec4(vec3(0.85, 0.40, 0.55), 1.0);
        return;
    }

    float gradientFactor = clamp(v, 0.0, 1.0);

    // Цвета градиента заката
    vec3 topColor = vec3(0.15, 0.12, 0.35);    
    vec3 horizonColor = vec3(0.85, 0.40, 0.55); 
    vec3 skyColor = mix(horizonColor, topColor, pow(gradientFactor, 0.7));

    // Добавляем движущиеся облака на основе проекции координат сферы
    vec2 cloudCoord = normPos.xz / (normPos.y + 0.2) * 3.0;
    // Смещаем координаты по времени (убедись, что передаем uTime)
    cloudCoord.x += uTime * 0.02; 

    float n = noise(cloudCoord);
    // Делаем облака контрастными и обрезаем по высоте
    float clouds = smoothstep(0.4, 0.7, n) * smoothstep(0.0, 0.3, v);

    // Цвет облаков (подсвечены закатным розовым/оранжевым светом)
    vec3 cloudColor = vec3(1.0, 0.8, 0.85);
    
    // Смешиваем небо и облака
    skyColor = mix(skyColor, cloudColor, clouds * 0.6);

    // Ретро-постеризация цвета (пиксельный стиль PS1)
    skyColor = floor(skyColor * 128.0) / 128.0;

    gl_FragColor = vec4(skyColor, 1.0);
}