import { create } from 'zustand';

export const useGameStore = create((set) => ({
  // Состояние игры
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  // Текущая анимация персонажа
  characterAnimation: 'idle',
  setCharacterAnimation: (anim) => set({ characterAnimation: anim }),

  // Настройки графики и звука (на будущее)
  settings: {
    graphicsQuality: 'high', // 'high' | 'low' (для слабых устройств)
    masterVolume: 0.8,
    musicMuted: false,
  },
  
  updateSettings: (newSettings) => 
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
}));