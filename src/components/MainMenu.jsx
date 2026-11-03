import React, { useState } from 'react';

export function MainMenu({ onStart, onSettings, onExit }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { label: 'играть', action: onStart },
    { label: 'настройки', action: onSettings },
    { label: 'выход', action: onExit },
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
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '50px',
      overflow: 'hidden',
    }}>
      
      {/* Статичный фоновый контейнер */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}images/menuBack1.png)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.25, mixBlendMode: 'screen',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}images/menuBack2.png)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.2, mixBlendMode: 'screen',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}images/menuBack3.png)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.2, mixBlendMode: 'overlay',
        }} />
      </div>

      {/* Темная виньетка */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle, rgba(10,10,10,0.1) 0%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Контейнер меню с наклоном */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '48vw',
        transform: 'rotate(-4deg) skewY(-4deg)',
        pointerEvents: 'auto',
        zIndex: 5,
      }}>

        {/* Вертикальная плашка MENU со рваными краями */}
        <div style={{
          background: 'var(--retro-card-bg)',
          color: 'var(--retro-text)',
          padding: '70px 28px',
          fontSize: '5.8rem',
          letterSpacing: '10px',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          borderRight: '20px solid var(--retro-accent)',
          boxShadow: '12px 12px 35px rgba(0,0,0,0.9)',
          zIndex: 2,
          textAlign: 'center',
          textShadow: '2px 2px 0px var(--retro-accent)',
          clipPath: 'polygon(0% 0%, 100% 2%, 95% 25%, 100% 50%, 94% 75%, 100% 98%, 0% 100%, 3% 50%)',
        }}>
          MENU
        </div>

        {/* Кнопки со рваными краями (clipPath) и левым акцентом */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginLeft: '12px', flex: 1 }}>
          {menuItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            const offsetLeft = index % 2 === 0 ? '0px' : '-12px';

            return (
              <div
                key={item.label}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={item.action}
                style={{
                  background: isSelected ? 'var(--retro-text)' : 'var(--retro-card-bg)',
                  color: isSelected ? '#000000' : 'var(--retro-text)',
                  padding: '24px 35px',
                  fontSize: '4.4rem',
                  letterSpacing: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%',
                  boxSizing: 'border-box',
                  boxShadow: '8px 8px 25px rgba(0,0,0,0.85)',
                  borderLeft: isSelected ? '24px solid var(--retro-accent)' : '6px solid #333',
                  transition: 'background 0.1s ease, color 0.1s ease, transform 0.1s ease',
                  transform: `translateX(${offsetLeft}) ${isSelected ? 'scale(1.02) translateX(12px)' : 'scale(1)'}`,
                  clipPath: 'polygon(0% 3%, 98% 0%, 100% 35%, 97% 70%, 100% 97%, 1% 100%, 3% 50%)',
                  textShadow: isSelected ? 'none' : '2px 2px 4px rgba(0,0,0,0.9)',
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="crt-overlay" />
    </div>
  );
}