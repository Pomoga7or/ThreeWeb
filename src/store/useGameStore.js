import { create } from 'zustand';

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
    masterVolume: 0.35,
    musicMuted: false,
    crtEnabled: true,
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));