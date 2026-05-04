import gsap from 'gsap';
import { animationPresets } from './presets';

/**
 * Creates and returns a GSAP Timeline orchestrating the hero section entrance animations.
 * This timeline manages a cinematic, multi-stage entrance sequence with precise timing coordination.
 *
 * Animation Sequence:
 * - t=0.0s: Hero background fades in (opacity 0→1, 0.8s)
 * - t=0.1s: Hero title slides up + fades (y: 50→0, opacity 0→1, 0.8s)
 * - t=0.3s: Hero subtitle fades in (y: 30→0, opacity 0→1, 0.6s)
 * - t=0.5s: CTA buttons scale + fade with stagger (scale 0.95→1, y: 20→0, opacity 0→1, 0.6s, 0.15s stagger)
 * - t=1.0s: CTA glow pulse loops infinitely (boxShadow animation, 2s cycle, sine.inOut easing)
 */
export const createHeroTimeline = () => {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  // 1. Hero background - Fade in (opacity 0→1) over 0.8s at t=0
  timeline.fromTo(
    '.hero-background',
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    0
  );

  // 2. Hero title - Slide up + fade (y: 50→0, opacity 0→1) over 0.8s at t=0.1s
  timeline.fromTo(
    '.hero-title',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    0.1
  );

  // 3. Hero subtitle - Fade in (y: 30→0, opacity 0→1) over 0.6s at t=0.3s
  timeline.fromTo(
    '.hero-subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.3
  );

  // 4. CTA buttons - Scale + fade (scale 0.95→1, y: 20→0, opacity 0→1) over 0.6s with 0.15s stagger at t=0.5s
  timeline.fromTo(
    '.hero-cta',
    { opacity: 0, y: 20, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15
    },
    0.5
  );

  // 5. CTA glow pulse - Infinite loop on first button: boxShadow pulses from transparent to 30px glow and back, 2s duration, sine.inOut easing, starts at t=1s
  timeline.to(
    '.hero-cta:first-child',
    {
      boxShadow: [
        '0 0 20px rgba(255,255,255,0)',
        '0 0 30px rgba(255,255,255,0.3)',
        '0 0 20px rgba(255,255,255,0)'
      ],
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1
    },
    1
  );

  return timeline;
};

export default createHeroTimeline;
