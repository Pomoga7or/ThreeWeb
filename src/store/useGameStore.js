import { create } from 'zustand';

export const DEFAULT_SOUND_VOLUMES = {
  yardAmbience: 0.85,
  fireCrackle: 0.9,
  voiceMumble: 1.25,
  uiClick: 0.85,
  tvHum: 1.0,
  phoneTone: 1.0,
  arcadeBlip: 1.0,
};

export const useGameStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  characterAnimation: 'idle',
  setCharacterAnimation: (anim) => set({ characterAnimation: anim }),

  activeInteractable: null,
  setActiveInteractable: (id) =>
    set((state) => {
      const prevId = state.activeInteractable;
      const nextVisited =
        id && !state.visitedLocations.includes(id)
          ? [...state.visitedLocations, id]
          : state.visitedLocations;

      const nextLastVisited =
        id === 'about' && prevId && prevId !== 'about'
          ? prevId
          : state.lastVisitedLocation;

      return {
        activeInteractable: id,
        visitedLocations: nextVisited,
        lastVisitedLocation: nextLastVisited,
      };
    }),

  seenDialogueNodes: [],
  markDialogueNodeSeen: (nodeId) =>
    set((state) =>
      state.seenDialogueNodes.includes(nodeId)
        ? state
        : { seenDialogueNodes: [...state.seenDialogueNodes, nodeId] }
    ),

  visitedLocations: [],
  lastVisitedLocation: null,
  clearLastVisitedLocation: () => set({ lastVisitedLocation: null }),

  cameraTarget: 'Character',
  setCameraTarget: (target) => set({ cameraTarget: target }),

  debugOrbit: false,
  setDebugOrbit: (enabled) => set({ debugOrbit: enabled }),

  settings: {
    language: 'ru',
    graphicsQuality: 'high',
    masterVolume: 1.0,
    musicMuted: false,
    crtEnabled: true,
    soundVolumes: { ...DEFAULT_SOUND_VOLUMES },
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
        soundVolumes: {
          ...state.settings.soundVolumes,
          ...(newSettings.soundVolumes || {}),
        },
      },
    })),

  updateSoundVolume: (soundKey, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        soundVolumes: {
          ...state.settings.soundVolumes,
          [soundKey]: Math.min(2, Math.max(0, Number(value) || 0)),
        },
      },
    })),
}));