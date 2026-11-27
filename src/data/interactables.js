export const CAMERA_PRESETS = {
  overview: {
    position: [-2, 0.02, 3],
    lookAt: [-0.45, 0.15, 0.3],
  },
};

export const UI_TEXT = {
  ru: {
    overview: 'ОБЗОР',
    settings: 'НАСТРОЙКИ',
    exitTitle: 'ВЫХОД ИЗ ИГРЫ',
    exitMessage: 'Вы действительно хотите вернуться в Windows?',
    yes: 'ДА',
    no: 'НЕТ',
  },
  en: {
    overview: 'OVERVIEW',
    settings: 'SETTINGS',
    exitTitle: 'EXIT GAME',
    exitMessage: 'Do you really want to return to Windows?',
    yes: 'YES',
    no: 'NO',
  },
};

export const INTERACTABLES = [
  {
    id: 'about',
    step: '01',
    title: { ru: 'ОБО МНЕ', en: 'ABOUT ME' },
    modelPath: null, // используем существующего персонажа на сцене
    position: [-0.45, -0.09, 0.3],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    cameraPos: [-0.973, 0.5, 1.41],
    cameraLookAt: [-0.297, 0.39, 0.352],
    characterAnim: 'SittingDisapproval',
    description: {
      ru: 'Кто я, чем занимаюсь и как пришел к ретро-3D и фронтенду.',
      en: 'Who I am, what I do, and how I got into retro 3D and frontend.',
    },
  },
  {
    id: 'stack',
    step: '02',
    title: { ru: 'СТЕК И ПРОЦЕСС', en: 'STACK & WORKFLOW' },
    modelPath: `${import.meta.env.BASE_URL}models/tv.glb`,
    position: [3.3, 0.78, 7.0],
    rotation: [0.85, 1.9, -0.8],
    scale: [0.4, 0.4, 0.4],
    cameraPos: [2.837, 1.187, 5.44],
    cameraLookAt: [3.1, 1.16, 6.646],
    characterAnim: 'Sitting',
    description: {
      ru: 'Технологии, шейдеры, оптимизация и этапы работы над проектом.',
      en: 'Technologies, shaders, optimization, and project workflow.',
    },
  },
  {
    id: 'contacts',
    step: '04',
    title: { ru: 'КОНТАКТЫ', en: 'CONTACTS' },
    modelPath: `${import.meta.env.BASE_URL}models/phone.glb`,
    position: [-0.058, 0.226, 0.553],
    rotation: [0.0, 1.8, 1.7],
    scale: [0.05, 0.05, 0.05],
    cameraPos: [-0.08, 0.382, 0.52],
    cameraLookAt: [-0.02, -0.05, 0.65],
    characterAnim: 'Sitting',
    description: {
      ru: 'Связь, соцсети и ссылки.',
      en: 'Get in touch, socials, and links.',
    },
  },
  {
    id: 'minigame',
    step: '05',
    title: { ru: 'МИНИ-ИГРА', en: 'MINI-GAME' },
    modelPath: `${import.meta.env.BASE_URL}models/arcade.glb`,
    position: [-0.5, -0.3, 8.0],
    rotation: [0, -3.1, 0],
    scale: [0.8, 0.8, 0.8],
    cameraPos: [-0.634, 1.38, 6.565],
    cameraLookAt: [-0.629, 1.359, 6.863],
    characterAnim: 'Sitting',
    description: {
      ru: 'Запуск мини-игры.',
      en: 'Launch mini-game.',
    },
  },
];