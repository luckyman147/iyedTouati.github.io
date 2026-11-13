import { useEffect, useRef } from 'react';

const canTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Subtle 3D tilt + cursor glow position for cards (desktop only).
 * Writes styles directly (rAF-throttled) — never touches React state.
 * Pair with the `.card-glow` class to show the glow spot.
 */
export function useTilt(max = 6) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canTilt()) return;

    let frame = 0;
    let px = 0.5;
    let py = 0.5;

    const apply = () => {
      frame = 0;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onEnter = () => {
      el.style.transition = 'transform 0.15s ease-out';
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [max]);

  return ref;
}

export default useTilt;
