import React from 'react';

export function GameCard({ isOpen, title, message, onConfirm, onClose, confirmText = 'OK', cancelText = 'CANCEL' }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      pointerEvents: 'auto',
      fontFamily: "'Pershotravneva55', monospace",
    }}>
      <style>{`
        @keyframes cardPop {
          0% { transform: scale(0.95) rotate(-1deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>

      {/* Окно карточки */}
      <div style={{
        position: 'relative',
        width: '520px',
        background: 'var(--retro-card-bg)',
        border: '3px solid var(--retro-border)',
        borderLeft: '10px solid var(--retro-accent)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.95), inset 0 0 20px rgba(255, 0, 85, 0.05)',
        padding: '35px 45px',
        color: 'var(--retro-text)',
        animation: 'cardPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        boxSizing: 'border-box',
      }}>
        
        {/* Заголовок */}
        {title && (
          <div style={{
            fontSize: '1.8rem',
            letterSpacing: '3px',
            marginBottom: '18px',
            color: 'var(--retro-text)',
            borderBottom: '2px solid var(--retro-border)',
            paddingBottom: '12px',
            textTransform: 'uppercase',
            textShadow: '2px 2px #000',
          }}>
            {title}
          </div>
        )}

        {/* Текст сообщения */}
        <div style={{
          fontSize: '1.15rem',
          letterSpacing: '1.5px',
          lineHeight: '1.6',
          color: 'var(--retro-text-muted)',
          marginBottom: '35px',
        }}>
          {message}
        </div>

        {/* Кнопки */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end',
        }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: '#141414',
                color: 'var(--retro-text)',
                border: '2px solid var(--retro-border)',
                padding: '12px 28px',
                fontSize: '1rem',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'background 0.1s, border-color 0.1s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#222';
                e.target.style.borderColor = '#444';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#141414';
                e.target.style.borderColor = 'var(--retro-border)';
              }}
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm || onClose}
            style={{
              background: 'var(--retro-accent)',
              color: 'var(--retro-text)',
              border: '2px solid var(--retro-accent)',
              padding: '12px 32px',
              fontSize: '1rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 0 15px rgba(255, 0, 85, 0.4)',
              transition: 'filter 0.1s, transform 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.15)'}
            onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}