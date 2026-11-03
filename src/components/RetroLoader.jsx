import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

// ==========================================
// РЕЖИМ ОТЛАДКИ ЛОАДЕРА:
// true  — лоадер висит бесконечно для настройки
// false — стандартный режим (исчезнет при 100%)
// ==========================================
const DEBUG_MODE = false; 

export function RetroLoader() {
  const { progress: realProgress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING');

  // Гибридная логика: мгновенный старт + синхронизация с реальным useProgress
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (DEBUG_MODE) {
          if (prev >= 100) return 100;
          return prev + 1;
        }

        const target = realProgress || 0;
        if (prev >= 100 || (!active && prev >= 99)) return 100;

        if (prev < target) {
          return Math.min(target, prev + 2);
        }

        if (target === 0 && prev < 90) {
          return prev + 0.5;
        }

        return prev;
      });
    }, 5);

    return () => clearInterval(interval);
  }, [realProgress, active]);

  const isHidden = DEBUG_MODE ? (displayProgress >= 100) : (!active && displayProgress >= 100);

  useEffect(() => {
    if (displayProgress < 30) {
      setStatusText('LOADING ASSETS...');
    } else if (displayProgress < 70) {
      setStatusText('DECOMPRESSING MESHOPT...');
    } else {
      setStatusText('PREPARING SCENE...');
    }
  }, [displayProgress]);

  if (isHidden) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#030303',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: "'Pershotravneva55', monospace",
      userSelect: 'none',
      overflow: 'hidden',
    }}>
      <style>
        {`
          @keyframes subtleZoom {
            0%, 100% { transform: scale(1.02); }
            50% { transform: scale(1.08); }
          }
          @keyframes glitchDrift {
            0% { transform: translate(0px, 0px); }
            20% { transform: translate(-8px, 5px); }
            40% { transform: translate(5px, -6px); }
            60% { transform: translate(-4px, -3px); }
            80% { transform: translate(6px, 4px); }
            100% { transform: translate(0px, 0px); }
          }
          @keyframes crtFlicker {
            0% { opacity: 0.96; }
            50% { opacity: 1; }
            100% { opacity: 0.94; }
          }
        `}
      </style>

      {/* ЕДИНЫЙ КОНТЕЙНЕР: фон (двигается синхронно) */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '-5%',
        width: '110vw',
        height: '110vh',
        backgroundImage: `url(${import.meta.env.BASE_URL}images/loaderWall.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'subtleZoom 12s ease-in-out infinite, glitchDrift 8s ease-in-out infinite, crtFlicker 0.15s infinite',
        filter: 'contrast(125%) saturate(85%) brightness(40%) blur(0.5px)',
        zIndex: 1,
        perspective: '1200px', // Включаем 3D-пространство для контейнера
      }}>
        
        <div style={{
          position: 'absolute',
          bottom: '28%', // Скорректировали позицию под увеличенный размер
          right: '18%',
          transform: 'rotateX(8deg) rotateY(-45deg) rotateZ(-4deg)',
          transformStyle: 'preserve-3d',
          background: 'rgba(10, 10, 10, 0.92)',
          border: '2px solid rgba(255, 51, 51, 0.4)',
          padding: '38px 48px', // Увеличенные внутренние отступы
          width: '620px',        // Увеличенная ширина плашки
          boxShadow: '0 30px 60px rgba(0,0,0,0.95), inset 0 0 25px rgba(255, 51, 51, 0.15)',
        }}>
          
          {/* Текст статуса (красный) */}
          <div style={{
            fontSize: '1rem',
            color: '#ff3333',
            marginBottom: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: '2px 2px #000',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>{statusText}</span>
            <span style={{ color: '#fff' }}>{Math.round(displayProgress)}%</span>
          </div>

          {/* Полоска загрузки (красная) */}
          <div style={{
            width: '100%',
            height: '10px',
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid #333',
            padding: '2px',
            boxSizing: 'border-box',
          }}>
            <div style={{
              width: `${displayProgress}%`,
              height: '100%',
              background: '#ff3333',
              boxShadow: '0 0 8px #ff3333, inset 0 0 6px rgba(255,255,255,0.3)',
              transition: 'width 0.1s ease-out',
            }} />
          </div>
        </div>

      </div>

      {/* CRT-сканлайны поверх всего экрана */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04))',
        backgroundSize: '100% 4px, 6px 100%',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Подсказка отладки внизу */}
      <div style={{
        position: 'absolute',
        bottom: '25px',
        zIndex: '3',
        fontSize: '0.65rem',
        color: '#555',
        letterSpacing: '1px',
      }}>
        {DEBUG_MODE ? 'DEBUG MODE ACTIVE' : ''}
      </div>
    </div>
  );
}