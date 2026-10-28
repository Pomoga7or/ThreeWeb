import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export function useCharacterAnimations(animations, scene) {
    const mixerRef = useRef(null);
    const actionsRef = useRef({});
    const currentActionRef = useRef(null);

    // Инициализация миксера при монтировании
    useEffect(() => {
        if (!animations || animations.length === 0 || !scene) return;

        const mixer = new THREE.AnimationMixer(scene);
        mixerRef.current = mixer;

        const actions = {};
        animations.forEach((clip) => {
            const action = mixer.clipAction(clip, scene);
            action.enabled = true;
            actions[clip.name] = action;
        });
        actionsRef.current = actions;

        return () => {
            mixer.stopAllAction();
        };
    }, [animations, scene]);

    // Функция переключения анимации, которую можно вызывать из любого события
    const playAnimation = useCallback((name, fadeDuration = 0.2, loop = THREE.LoopRepeat) => {
        const actions = actionsRef.current;
        const targetAction = actions[name];

        if (!targetAction) {
            console.warn(`Анимация с именем "${name}" не найдена!`);
            return;
        }

        const prevAction = currentActionRef.current;

        if (prevAction !== targetAction) {
            targetAction.reset();
            targetAction.setEffectiveTimeScale(1);
            targetAction.setEffectiveWeight(1);
            targetAction.setLoop(loop, loop === THREE.LoopOnce ? 1 : Infinity);
            targetAction.clampWhenFinished = loop === THREE.LoopOnce;
            targetAction.play();

            if (prevAction) {
                prevAction.crossFadeTo(targetAction, fadeDuration, true);
            }

            currentActionRef.current = targetAction;
        }
    }, []);

    // Обновление миксера (вызывается в useFrame)
    const updateMixer = useCallback((delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
    }, []);

    return { playAnimation, updateMixer, actions: actionsRef.current };
}