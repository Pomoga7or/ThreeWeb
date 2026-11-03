import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

const bgImageSrc = new URL('../images/loaderWall.png', import.meta.url).href;
const DEBUG_MODE = false; 

export function RetroLoader() {
  const { progress: realProgress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING');

  useEffect(() => {
    const img = new Image();
    img.src = bgImageSrc;
  }, []);

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
    }, 10);

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
      backgroundColor: 'var(--retro-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: "'Pershotravneva55', monospace",
      userSelect: 'none',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '-5%',
        width: '110vw',
        height: '110vh',
        backgroundColor: 'var(--retro-bg)',
        backgroundImage: `url(${bgImageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'subtleZoom 12s ease-in-out infinite, glitchDrift 8s ease-in-out infinite',
        filter: 'contrast(125%) saturate(85%) brightness(40%) blur(0.5px)',
        zIndex: 1,
        perspective: '1200px',
      }}>
        
        {/* 3D-плашка */}
        <div style={{
          position: 'absolute',
          bottom: '28%',
          right: '18%',
          transform: 'rotateX(8deg) rotateY(-45deg) rotateZ(-4deg)',
          transformStyle: 'preserve-3d',
          background: 'var(--retro-card-bg)',
          border: '2px solid rgba(255, 0, 85, 0.4)',
          padding: '38px 48px',
          width: '620px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.95), inset 0 0 25px rgba(255, 0, 85, 0.15)',
        }}>
          <div style={{
            fontSize: '1.5rem',
            color: 'var(--retro-accent)',
            marginBottom: '18px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textShadow: '3px 3px #000',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>{statusText}</span>
            <span style={{ color: 'var(--retro-text)' }}>{Math.round(displayProgress)}%</span>
          </div>

          <div style={{
            width: '100%',
            height: '16px',
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid var(--retro-border)',
            padding: '3px',
            boxSizing: 'border-box',
          }}>
            <div style={{
              width: `${displayProgress}%`,
              height: '100%',
              background: 'var(--retro-accent)',
              boxShadow: '0 0 12px var(--retro-accent), inset 0 0 8px rgba(255,255,255,0.3)',
              transition: 'width 0.1s ease-out',
            }} />
          </div>
        </div>
      </div>

      {/* CRT-сканлайны через глобальный класс */}
      <div className="crt-overlay" />

      <div style={{
        position: 'absolute',
        bottom: '25px',
        zIndex: 3,
        fontSize: '0.65rem',
        color: '#555',
        letterSpacing: '1px',
      }}>
        {DEBUG_MODE ? 'DEBUG MODE ACTIVE' : ''}
      </div>
    </div>
  );
}