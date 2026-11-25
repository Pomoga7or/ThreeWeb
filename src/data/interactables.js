export const CAMERA_PRESETS = {
  overview: {
    position: [-2, 0.02, 3],
    lookAt: [-0.45, 0.15, 0.3],
  },
};

export const INTERACTABLES = [
  {
    id: 'about',
    step: '01',
    title: 'ОБО МНЕ',
    modelPath: null, // используем существующего персонажа на сцене
    position: [-0.45, -0.09, 0.3],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    cameraPos: [-1.3, 0.25, 1.8],
    cameraLookAt: [-0.45, 0.2, 0.3],
    characterAnim: 'SittingDisapproval',
    description: 'Кто я, чем занимаюсь и как пришел к ретро-3D и фронтенду.',
  },
  {
    id: 'stack',
    step: '02',
    title: 'СТЕК И ПРОЦЕСС',
    modelPath: `${import.meta.env.BASE_URL}models/tv.glb`,
    position: [3.3, 0.78, 7.0], // подстроишь под свой ящик в кадре
    rotation: [0.85, 1.9, -0.8],
    scale: [0.4, 0.4, 0.4],
    cameraPos: [2.837, 1.187, 5.44],
    cameraLookAt: [3.1, 1.16, 6.646],
    characterAnim: 'Sitting',
    description: 'Технологии, шейдеры, оптимизация и этапы работы над проектом.',
  },
  {
    id: 'contacts',
    step: '04',
    title: 'КОНТАКТЫ',
    modelPath: `${import.meta.env.BASE_URL}models/phone.glb`,
    position: [-0.058, 0.226, 0.553], // подстроишь под локацию
    rotation: [0.0, 1.8, 1.7],
    scale: [0.05, 0.05, 0.05],
    cameraPos: [-0.08, 0.342, 0.52],
    cameraLookAt: [-0.02, -0.05, 0.65],
    
    characterAnim: 'Sitting',
    description: 'Связь, соцсети и ссылки.',
  },
  {
    id: 'minigame',
    step: '05',
    title: 'МИНИ-ИГРА',
    modelPath: `${import.meta.env.BASE_URL}models/arcade.glb`,
    position: [-0.5, -0.3, 8.0], // подстроишь под локацию
    rotation: [0, -3.1, 0],
    scale: [0.8, 0.8, 0.8],
    cameraPos: [-0.6, -0.15, 1.2],
    cameraLookAt: [-0.9, -0.45, 0.2],
    characterAnim: 'Sitting',
    description: 'Запуск мини-игры.',
  },
];