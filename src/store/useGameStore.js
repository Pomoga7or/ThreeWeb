import { create } from 'zustand';

export const useGameStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  characterAnimation: 'idle',
  setCharacterAnimation: (anim) => set({ characterAnimation: anim }),

  activeInteractable: null,
  setActiveInteractable: (id) => set({ activeInteractable: id }),

  cameraTarget: 'Character',
  setCameraTarget: (target) => set({ cameraTarget: target }),

  debugOrbit: false,
  setDebugOrbit: (enabled) => set({ debugOrbit: enabled }),

  settings: {
    graphicsQuality: 'high',
    masterVolume: 0.8,
    musicMuted: false,
    crtEnabled: true,
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));