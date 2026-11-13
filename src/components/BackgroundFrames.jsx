import React, { useEffect, useRef } from 'react';
import '../styles/nebula.css';

// Deterministic star field baked into a single background-image per layer
// (no DOM nodes per star). Generated once at module load.
function makeStars(count, seed, maxSize) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() * 100).toFixed(2);
    const y = (rand() * 100).toFixed(2);
    const size = (0.6 + rand() * maxSize).toFixed(2);
    const alpha = (0.4 + rand() * 0.6).toFixed(2);
    dots.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${alpha}) 50%, transparent 100%)`);
  }
  return dots.join(',');
}

const FAR_STARS = makeStars(60, 7, 0.9);
const NEAR_STARS = makeStars(30, 42, 1.6);

const BackgroundFrames = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Cheap scroll parallax: one CSS variable, rAF-throttled.
    let ticking = false;
    const update = () => {
      ticking = false;
      root.style.setProperty('--bg-shift', String(window.scrollY));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Pause all CSS animations while the tab is hidden.
    const onVisibility = () => root.classList.toggle('nebula--paused', document.hidden);

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="nebula" aria-hidden="true">
      <div className="nebula__parallax nebula__parallax--slow">
        <div className="nebula__blob nebula__blob--plasma" />
        <div className="nebula__blob nebula__blob--quantum" />
      </div>
      <div className="nebula__parallax nebula__parallax--fast">
        <div className="nebula__blob nebula__blob--cyan" />
        <div className="nebula__blob nebula__blob--solar" />
      </div>
      <div className="nebula__stars nebula__stars--far" style={{ backgroundImage: FAR_STARS }} />
      <div className="nebula__stars nebula__stars--near" style={{ backgroundImage: NEAR_STARS }} />
      <div className="nebula__vignette" />
    </div>
  );
};

export default BackgroundFrames;
