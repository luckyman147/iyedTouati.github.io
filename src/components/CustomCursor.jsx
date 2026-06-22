import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const blobRef = useRef(null);
  const dotRef  = useRef(null);

  useEffect(() => {
    const mouse = { x: -200, y: -200 };
    const pos   = { x: -200, y: -200 };
    const vel   = { x: 0,    y: 0    };
    let hovering = false;
    let visible  = false;
    let animId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        pos.x = mouse.x;
        pos.y = mouse.y;
        visible = true;
      }
      // dot snaps to exact cursor tip
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;
      }
    };

    const onOver = (e) => {
      const t = e.target;
      hovering = !!(
        t.tagName === 'A'      ||
        t.tagName === 'BUTTON' ||
        t.closest('a')         ||
        t.closest('button')    ||
        t.closest('.cursor-crosshair')
      );
    };

    const loop = () => {
      // velocity tracks how fast blob needs to move
      vel.x = lerp(vel.x, mouse.x - pos.x, 0.18);
      vel.y = lerp(vel.y, mouse.y - pos.y, 0.18);

      pos.x = lerp(pos.x, mouse.x, 0.13);
      pos.y = lerp(pos.y, mouse.y, 0.13);

      const speed        = Math.sqrt(vel.x ** 2 + vel.y ** 2);
      const angle        = Math.atan2(vel.y, vel.x) * (180 / Math.PI);
      const stretch      = Math.min(speed * 0.038, 0.6);
      const scaleX       = 1 + stretch;
      const scaleY       = Math.max(0.55, 1 - stretch * 0.65);

      if (blobRef.current) {
        const size = hovering ? 52 : 26;

        blobRef.current.style.transform = [
          `translate3d(${pos.x}px,${pos.y}px,0)`,
          `translate(-50%,-50%)`,
          `rotate(${angle}deg)`,
          `scaleX(${scaleX.toFixed(3)})`,
          `scaleY(${scaleY.toFixed(3)})`,
        ].join(' ');

        blobRef.current.style.width  = `${size}px`;
        blobRef.current.style.height = `${size}px`;
        blobRef.current.style.opacity = visible ? '1' : '0';

        if (hovering) {
          blobRef.current.style.backgroundColor = 'transparent';
          blobRef.current.style.border          = '1.5px solid rgba(0,212,255,0.85)';
          blobRef.current.style.boxShadow       =
            '0 0 16px rgba(0,212,255,0.6), 0 0 36px rgba(0,212,255,0.25), inset 0 0 12px rgba(0,212,255,0.08)';
          blobRef.current.style.filter = 'blur(0px)';
        } else {
          blobRef.current.style.backgroundColor = 'rgba(0,212,255,0.55)';
          blobRef.current.style.border          = 'none';
          blobRef.current.style.boxShadow       =
            '0 0 10px rgba(0,212,255,0.7), 0 0 22px rgba(0,212,255,0.35)';
          blobRef.current.style.filter = `blur(${(1.5 - stretch).toFixed(1)}px)`;
        }
      }

      if (dotRef.current) {
        // dot: visible when idle, hidden when hovering
        dotRef.current.style.opacity = visible && !hovering ? '1' : '0';
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">

      {/* Tiny sharp dot at exact mouse tip */}
      <div
        ref={dotRef}
        style={{
          position:        'absolute',
          top: 0, left: 0,
          width:           '4px',
          height:          '4px',
          borderRadius:    '50%',
          backgroundColor: '#fff',
          opacity:         0,
          transition:      'opacity 0.12s ease',
          willChange:      'transform, opacity',
        }}
      />

      {/* Stretchy blob */}
      <div
        ref={blobRef}
        style={{
          position:        'absolute',
          top: 0, left: 0,
          width:           '26px',
          height:          '26px',
          borderRadius:    '50%',
          backgroundColor: 'rgba(0,212,255,0.55)',
          boxShadow:       '0 0 10px rgba(0,212,255,0.7), 0 0 22px rgba(0,212,255,0.35)',
          opacity:         0,
          mixBlendMode:    'screen',
          transition:      'width 0.18s ease, height 0.18s ease, background-color 0.18s ease, border 0.18s ease, box-shadow 0.18s ease',
          willChange:      'transform, width, height, opacity, filter',
        }}
      />

    </div>
  );
};

export default CustomCursor;
