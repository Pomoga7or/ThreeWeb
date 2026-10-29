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
    }}>
      <style>{`

        @keyframes crtFlicker {
          0% { opacity: 0.96; }
          50% { opacity: 1; }
          100% { opacity: 0.97; }
        }
      `}</style>

      {/* --- ФОНЫ И МАЗКИ ПОД КНОПКАМИ (с правильным смешиванием) --- */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {/* Текстура 1 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}images/menuBack1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }} />

        {/* Текстура 2 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}images/menuBack2.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          mixBlendMode: 'multiply',
        }} />

        {/* Текстура 3 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${import.meta.env.BASE_URL}images/menuBack3.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          mixBlendMode: 'overlay',
        }} />
      </div>

      {/* Темная виньетка для глубины */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle, rgba(10,10,10,0.1) 0%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* --- КОНТЕЙНЕР МЕНЮ (Кнопки поверх фонов, но под ЭЛТ-фильтром) --- */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '48vw',
        transform: 'rotate(-4deg) skewY(-4deg)',
        pointerEvents: 'auto',
        zIndex: 5,
      }}>

        {/* Вертикальная плашка MENU */}
        <div style={{
          background: '#050505',
          color: '#fff',
          padding: '70px 28px',
          fontSize: '5.8rem',
          letterSpacing: '10px',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          borderRight: '6px solid #ff0055',
          boxShadow: '12px 12px 35px rgba(0,0,0,0.9)',
          zIndex: 2,
          textAlign: 'center',
          textShadow: '2px 2px 0px #ff0055',
          clipPath: 'polygon(0% 0%, 100% 2%, 95% 25%, 100% 50%, 94% 75%, 100% 98%, 0% 100%, 3% 50%)',
        }}>
          MENU
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginLeft: '10px', flex: 1 }}>
          {menuItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            const offsetLeft = index % 2 === 0 ? '0px' : '-12px';

            return (
              <div
                key={item.label}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={item.action}
                style={{
                  background: isSelected ? '#ffffff' : '#0d0d0d',
                  color: isSelected ? '#000000' : '#ffffff',
                  padding: '24px 35px',
                  fontSize: '4.4rem',
                  letterSpacing: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%',
                  boxSizing: 'border-box',
                  boxShadow: '8px 8px 25px rgba(0,0,0,0.85)',
                  borderLeft: isSelected ? '30px solid #ff0055' : '4px solid #333',
                  transition: 'background 0.1s, color 0.1s, transform 0.1s',
                  transform: `translateX(${offsetLeft}) ${isSelected ? 'scale(1.02) translateX(12px)' : 'scale(1)'}`,
                  clipPath: 'polygon(0% 3%, 98% 0%, 100% 35%, 97% 70%, 100% 97%, 1% 100%, 3% 50%)',
                  textShadow: isSelected ? 'none' : '1px 1px 2px rgba(0,0,0,0.8)',
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* ЭЛТ-сканлайны поверх абсолютно всего для цельного ретро-эффекта */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
        backgroundSize: '100% 3px',
        pointerEvents: 'none',
        zIndex: 20,
        animation: 'crtFlicker 0.15s infinite',
      }} />
    </div>
  );
}