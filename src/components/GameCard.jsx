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
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      pointerEvents: 'auto',
    }}>
      <style>{`
        @keyframes cardPop {
          0% { transform: scale(0.9) rotate(-2deg); opacity: 0; }
          100% { transform: scale(1) rotate(-1deg); opacity: 1; }
        }
      `}</style>

      {/* Основное окно карточки */}
      <div style={{
        position: 'relative',
        width: '480px',
        background: '#0d0d0d',
        border: '4px solid #222',
        borderLeft: '8px solid #ff0055',
        boxShadow: '15px 15px 40px rgba(0,0,0,0.9)',
        padding: '30px 40px',
        color: '#ffffff',
        transform: 'rotate(-1deg)',
        animation: 'cardPop 0.15s ease-out forwards',
        boxSizing: 'border-box',
      }}>
        
        {/* Заголовок карточки */}
        {title && (
          <div style={{
            fontSize: '2.2rem',
            letterSpacing: '3px',
            marginBottom: '15px',
            color: '#fff',
            borderBottom: '2px solid #222',
            paddingBottom: '10px',
            textTransform: 'uppercase',
          }}>
            {title}
          </div>
        )}

        {/* Текст / Сообщение */}
        <div style={{
          fontSize: '1.4rem',
          letterSpacing: '1.5px',
          lineHeight: '1.4',
          color: '#ccc',
          marginBottom: '30px',
        }}>
          {message}
        </div>

        {/* Блок кнопок управления */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end',
        }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: '#1a1a1a',
                color: '#fff',
                border: '2px solid #333',
                padding: '12px 25px',
                fontSize: '1.2rem',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'background 0.1s, transform 0.1s',
              }}
              onMouseEnter={(e) => e.target.style.background = '#333'}
              onMouseLeave={(e) => e.target.style.background = '#1a1a1a'}
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm || onClose}
            style={{
              background: '#ff0055',
              color: '#fff',
              border: '2px solid #ff0055',
              padding: '12px 30px',
              fontSize: '1.2rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '4px 4px 15px rgba(255,0,85,0.4)',
              transition: 'background 0.1s, transform 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#ff2a6d'}
            onMouseLeave={(e) => e.target.style.background = '#ff0055'}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}