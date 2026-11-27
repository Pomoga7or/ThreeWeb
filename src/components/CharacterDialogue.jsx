import React, { useEffect, useState } from 'react';
import { ABOUT_DIALOGUE } from '../data/aboutDialogue';
import { useGameStore } from '../store/useGameStore';

export function CharacterDialogue({
  isOpen,
  onClose,
  onSelectLocation,
}) {
  const lang = useGameStore((state) => state.settings.language) || 'ru';
  const setCharacterAnimation = useGameStore((state) => state.setCharacterAnimation);
  const [nodeId, setNodeId] = useState(ABOUT_DIALOGUE.startNodeId);

  useEffect(() => {
    if (isOpen) {
      setNodeId(ABOUT_DIALOGUE.startNodeId);
    }
  }, [isOpen]);

  const currentNode = ABOUT_DIALOGUE.nodes[nodeId] || ABOUT_DIALOGUE.nodes.root;

  useEffect(() => {
    if (isOpen && currentNode?.anim) {
      setCharacterAnimation(currentNode.anim);
    }
  }, [isOpen, currentNode, setCharacterAnimation]);

  if (!isOpen) return null;

  const speakerText = currentNode.speaker?.[lang] || currentNode.speaker?.ru || '';
  const bodyText = currentNode.text?.[lang] || currentNode.text?.ru || '';

  const handleChoiceClick = (choice) => {
    if (choice.actionLocation) {
      if (onSelectLocation) onSelectLocation(choice.actionLocation);
      return;
    }
    if (choice.nextId && ABOUT_DIALOGUE.nodes[choice.nextId]) {
      setNodeId(choice.nextId);
    }
  };

  return (
    <aside
      aria-label="Character Dialogue"
      style={{
        position: 'fixed',
        top: '50%',
        right: '28px',
        transform: 'translateY(-50%)',
        width: 'min(600px, 54vw)',
        maxHeight: '72vh',
        overflowY: 'auto',
        zIndex: 2300,
        background: 'var(--retro-card-bg, rgba(255, 255, 255, 0.94))',
        color: 'var(--retro-text, #f3f3f3)',
        border: '2px solid var(--retro-border, #f3f3f3)',
        borderLeft: '8px solid var(--retro-accent, #d91c1c)',
        padding: '18px 20px',
        boxShadow: '8px 8px 0px #000000b2',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--retro-border, #555)',
          paddingBottom: '8px',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            letterSpacing: '2px',
            color: 'var(--retro-accent, #ff4d4d)',
            fontWeight: 'bold',
          }}
        >
          {speakerText}
        </span>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'transparent',
            color: 'var(--retro-text, #f3f3f3)',
            border: '1px solid var(--retro-border, #f3f3f3)',
            padding: '3px 9px',
            fontSize: '0.75rem',
            letterSpacing: '1.5px',
            cursor: 'pointer',
          }}
        >
          {lang === 'en' ? 'ESC / BACK' : 'НАЗАД'}
        </button>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: '1.5rem',
          lineHeight: 1.55,
          letterSpacing: '0.6px',
        }}
      >
        {bodyText}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '4px',
        }}
      >
        {(currentNode.choices || []).map((choice, idx) => {
          const choiceLabel = choice.label?.[lang] || choice.label?.ru || '';
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => handleChoiceClick(choice)}
              style={{
                textAlign: 'left',
                background: choice.actionLocation
                  ? 'var(--retro-accent, #8f1414)'
                  : 'rgba(255, 255, 255, 0.04)',
                color: 'var(--retro-text, #f3f3f3)',
                border: '1px solid var(--retro-border, #aaa)',
                padding: '9px 12px',
                fontSize: '0.86rem',
                lineHeight: 1.35,
                letterSpacing: '0.8px',
                cursor: 'pointer',
                transition: 'transform 0.08s ease, background 0.12s ease',
              }}
            >
              {idx + 1}. {choiceLabel}
            </button>
          );
        })}
      </div>
    </aside>
  );
}