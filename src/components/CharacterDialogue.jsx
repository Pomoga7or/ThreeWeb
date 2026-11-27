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
  const seenDialogueNodes = useGameStore((state) => state.seenDialogueNodes);
  const markDialogueNodeSeen = useGameStore((state) => state.markDialogueNodeSeen);
  const lastVisitedLocation = useGameStore((state) => state.lastVisitedLocation);
  const clearLastVisitedLocation = useGameStore((state) => state.clearLastVisitedLocation);

  const [nodeId, setNodeId] = useState(ABOUT_DIALOGUE.startNodeId);
  const [history, setHistory] = useState([]);
  const [hoveredChoiceId, setHoveredChoiceId] = useState(null);
  const [typedLength, setTypedLength] = useState(0);
  const [activeText, setActiveText] = useState('');

  const currentNode = ABOUT_DIALOGUE.nodes[nodeId] || ABOUT_DIALOGUE.nodes.root;

  useEffect(() => {
    if (!isOpen) return;

    const rootNode = ABOUT_DIALOGUE.nodes[ABOUT_DIALOGUE.startNodeId];
    setNodeId(ABOUT_DIALOGUE.startNodeId);
    setHistory([]);
    setHoveredChoiceId(null);

    const reaction =
      lastVisitedLocation && rootNode?.locationReactions?.[lastVisitedLocation];

    if (reaction) {
      setActiveText(reaction[lang] || reaction.ru || '');
      clearLastVisitedLocation();
    } else if (seenDialogueNodes.includes(rootNode.id) && rootNode.revisitText) {
      setActiveText(rootNode.revisitText[lang] || rootNode.revisitText.ru || '');
    } else {
      setActiveText(rootNode.text?.[lang] || rootNode.text?.ru || '');
    }

    if (rootNode.anim) {
      setCharacterAnimation(rootNode.anim);
    }

    markDialogueNodeSeen(rootNode.id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !currentNode) return;

    if (currentNode.anim) {
      setCharacterAnimation(currentNode.anim);
    }

    if (currentNode.id !== ABOUT_DIALOGUE.startNodeId) {
      const alreadySeen = seenDialogueNodes.includes(currentNode.id);
      const sourceText =
        alreadySeen && currentNode.revisitText
          ? currentNode.revisitText
          : currentNode.text;

      setActiveText(sourceText?.[lang] || sourceText?.ru || '');
      markDialogueNodeSeen(currentNode.id);
    }
  }, [nodeId, lang]);

  useEffect(() => {
    if (!isOpen) return;
    setTypedLength(0);

    if (!activeText) return;

    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= activeText.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isOpen, activeText]);

  if (!isOpen) return null;

  const isTypingDone = typedLength >= activeText.length;
  const visibleText = isTypingDone ? activeText : activeText.slice(0, typedLength);

  const handleTextClick = () => {
    if (!isTypingDone) {
      setTypedLength(activeText.length);
    }
  };

  const handleStepBack = () => {
    if (history.length > 0) {
      const prevId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setNodeId(prevId);
    } else {
      onClose();
    }
  };

  const handleChoiceClick = (choice) => {
    if (choice.actionLocation) {
      if (onSelectLocation) onSelectLocation(choice.actionLocation);
      return;
    }
    if (choice.nextId && ABOUT_DIALOGUE.nodes[choice.nextId]) {
      setHistory((prev) => [...prev, nodeId]);
      setNodeId(choice.nextId);
    }
  };

  return (
    <aside
      className="character-dialogue"
      aria-label="Character Dialogue"
      style={{
        position: 'fixed',
        top: '50%',
        right: '28px',
        transform: 'translateY(-50%)',
        width: 'min(600px, 54vw)',
        maxHeight: '76vh',
        overflowY: 'auto',
        zIndex: 2300,
        background:
          'linear-gradient(180deg, rgba(22, 22, 26, 0.96) 0%, rgba(10, 10, 12, 0.98) 100%)',
        color: 'var(--retro-text, #f5f5f5)',
        border: '2px solid var(--retro-border, #f5f5f5)',
        borderLeft: '8px solid var(--retro-accent, #d91c1c)',
        padding: '18px 22px',
        boxShadow: '10px 10px 0px rgba(0, 0, 0, 0.85)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(255, 255, 255, 0.16)',
          paddingBottom: '10px',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            letterSpacing: '2.5px',
            color: '#99fd47',
            fontWeight: 'bold',
          }}
        >
          [{String(currentNode.id).toUpperCase()}]
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleStepBack}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--retro-text, #f5f5f5)',
              border: '1px solid var(--retro-border, #888)',
              padding: '4px 10px',
              fontSize: '0.75rem',
              letterSpacing: '1.5px',
              cursor: 'pointer',
            }}
          >
            {lang === 'en' ? 'BACK' : 'НАЗАД'}
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'var(--retro-accent, #b81414)',
              color: '#fff',
              border: '1px solid var(--retro-border, #f5f5f5)',
              padding: '4px 10px',
              fontSize: '0.75rem',
              letterSpacing: '1.5px',
              cursor: 'pointer',
            }}
          >
            {lang === 'en' ? 'CLOSE' : 'ЗАКРЫТЬ'}
          </button>
        </div>
      </div>

      <div
        onClick={handleTextClick}
        title={!isTypingDone ? (lang === 'en' ? 'Click to skip' : 'Кликни, чтобы дописать') : undefined}
        style={{
          cursor: !isTypingDone ? 'pointer' : 'default',
          padding: '10px 12px',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          minHeight: '96px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '1.25rem',
            lineHeight: 1.45,
            letterSpacing: '0.5px',
          }}
        >
          {visibleText}
          <span
            style={{
              display: 'inline-block',
              marginLeft: '4px',
              color: '#99fd47',
              opacity: isTypingDone ? 0.85 : 1,
            }}
          >
            {isTypingDone ? '▼' : '▌'}
          </span>
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {(currentNode.choices || []).map((choice, idx) => {
          const choiceLabel = choice.label?.[lang] || choice.label?.ru || '';
          const isHovered = hoveredChoiceId === choice.id;
          const isLocationJump = Boolean(choice.actionLocation);
          const isSeenBranch =
            Boolean(choice.nextId) && seenDialogueNodes.includes(choice.nextId);

          return (
            <button
              key={choice.id}
              type="button"
              onMouseEnter={() => setHoveredChoiceId(choice.id)}
              onMouseLeave={() => setHoveredChoiceId(null)}
              onClick={() => handleChoiceClick(choice)}
              style={{
                textAlign: 'left',
                background: isHovered
                  ? isLocationJump
                    ? 'var(--retro-accent, #d91c1c)'
                    : 'rgba(153, 253, 71, 0.14)'
                  : isLocationJump
                    ? 'rgba(184, 20, 20, 0.35)'
                    : 'rgba(255, 255, 255, 0.04)',
                color: isSeenBranch && !isHovered ? '#b5b5bd' : 'var(--retro-text, #f5f5f5)',
                border: isHovered
                  ? '1px solid #99fd47'
                  : '1px solid rgba(255, 255, 255, 0.28)',
                borderLeft: isLocationJump
                  ? '5px solid var(--retro-accent, #ff3b3b)'
                  : isHovered
                    ? '5px solid #99fd47'
                    : isSeenBranch
                      ? '5px solid rgba(153, 253, 71, 0.45)'
                      : '5px solid transparent',
                padding: '10px 14px',
                fontSize: '0.92rem',
                lineHeight: 1.35,
                letterSpacing: '0.6px',
                cursor: 'pointer',
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.08s ease, background 0.12s ease, border-color 0.12s ease',
              }}
            >
              <span
                style={{
                  color: isLocationJump ? '#ff6b6b' : '#99fd47',
                  marginRight: '8px',
                }}
              >
                {isHovered ? '▶' : `${idx + 1}.`}
              </span>
              {choiceLabel}
              {isSeenBranch && (
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '0.72rem',
                    opacity: 0.7,
                  }}
                >
                  [{lang === 'en' ? 'READ' : 'ЧИТАНО'}]
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}