import React, { Suspense, useMemo } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Location } from './Location';
import { Character } from './Character';
import { SkyDome } from './SkyDome';
import { CameraController } from './CameraController';
import { InteractiveModel } from '../components/InteractiveModel';
import { CAMERA_PRESETS, INTERACTABLES } from '../data/interactables';
import { useGameStore } from '../store/useGameStore';

export function Scene() {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const characterAnimation = useGameStore((state) => state.characterAnimation);
  const setCharacterAnimation = useGameStore((state) => state.setCharacterAnimation);
  const activeInteractable = useGameStore((state) => state.activeInteractable);
  const setActiveInteractable = useGameStore((state) => state.setActiveInteractable);

  const selectedItem = useMemo(
    () => INTERACTABLES.find((item) => item.id === activeInteractable) || null,
    [activeInteractable]
  );

  const handleSelectItem = (item) => {
    setActiveInteractable(item.id);
    if (item.characterAnim) {
      setCharacterAnimation(item.characterAnim);
    }
  };

  const modelItems = useMemo(
    () => INTERACTABLES.filter((item) => Boolean(item.modelPath)),
    []
  );

  const aboutItem = useMemo(
    () => INTERACTABLES.find((item) => item.id === 'about'),
    []
  );

  const targetPos = selectedItem ? selectedItem.cameraPos : CAMERA_PRESETS.overview.position;
  const targetLookAt = selectedItem ? selectedItem.cameraLookAt : CAMERA_PRESETS.overview.lookAt;

  return (
    <>
      <PerspectiveCamera makeDefault position={[-2, 0.02, 3]} fov={50} />

      <CameraController
        targetPos={targetPos}
        targetLookAt={targetLookAt}
        isEnabled={isPlaying}
      />

      <SkyDome />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      <Suspense fallback={null}>
        <Location position={[0, 0, 0]} />

        <Character
          animationName={characterAnimation}
          position={[-0.45, -0.09, 0.3]}
          onClick={(e) => {
            if (!isPlaying || !aboutItem) return;
            e.stopPropagation();
            handleSelectItem(aboutItem);
          }}
        />

        {modelItems.map((item) => (
          <InteractiveModel
            key={item.id}
            item={item}
            onSelect={handleSelectItem}
          />
        ))}
      </Suspense>
    </>
  );
}