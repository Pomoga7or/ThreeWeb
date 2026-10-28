import React, { useState } from 'react';

export function MainMenu({ onStart, onSettings, onExit }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { label: 'RESUME', action: onStart },
    { label: 'OPTIONS', action: onSettings },
    { label: 'BACK TO WINDOWS', action: onExit },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 1000,
      fontFamily: 'Impact, sans-serif',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '100px',
    }}>
      {/* Грязный текстурный фон с виньеткой */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle, rgba(20,20,20,0.4) 0%, rgba(5,5,5,0.92) 100%)',
        boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9)',
        pointerEvents: 'none',
      }}>
        {/* Имитация царапин и шума плёнки */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '4px 4px',
          opacity: 0.6,
          pointerEvents: 'none',
        }} />
      </div>

      {/* ЭЛТ-сканлайны и мерцание старого экрана */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 10,
        animation: 'crtFlicker 0.15s infinite',
      }} />

      {/* Контейнер меню с наклоном */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        transform: 'rotate(-5deg) skewY(-5deg) scale(1.25)',
        pointerEvents: 'auto',
        zIndex: 15,
      }}>
        
        {/* Вертикальная плашка сбоку */}
        <div style={{
          background: '#050505',
          color: '#fff',
          padding: '60px 18px',
          fontSize: '3.2rem',
          letterSpacing: '8px',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          borderRight: '5px solid #ff0055',
          boxShadow: '10px 10px 30px rgba(0,0,0,0.9)',
          zIndex: 2,
        }}>
          MENU
        </div>

        {/* Стопка наклонных кнопок */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginLeft: '-6px' }}>
          {menuItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={item.action}
                style={{
                  background: isSelected ? '#ffffff' : '#0d0d0d',
                  color: isSelected ? '#000000' : '#ffffff',
                  padding: '18px 60px 18px 45px',
                  fontSize: '1.8rem',
                  letterSpacing: '3px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '6px 6px 20px rgba(0,0,0,0.8)',
                  borderLeft: isSelected ? '8px solid #ff0055' : '3px solid #333',
                  transition: 'background 0.1s, color 0.1s, transform 0.1s',
                  transform: isSelected ? 'scale(1.03) translateX(12px)' : 'scale(1)',
                  clipPath: 'polygon(0% 0%, 99% 2%, 100% 97%, 1% 100%)',
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>

      </div>

      {/* CSS-анимация легкого мерцания ЭЛТ-экрана */}
      <style>{`
        @keyframes crtFlicker {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.98; }
        }
      `}</style>
    </div>
  );
}