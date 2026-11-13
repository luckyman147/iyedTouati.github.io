import gsap from 'gsap';

/**
 * Hero entrance timeline (transform + opacity only).
 *
 * - t=0.0s  background glow fades in
 * - t=0.1s  badge + title rise in
 * - t=0.2s  hero photo scales in (0.92 → 1)
 * - t=0.35s heading line + subtitle rise in
 * - t=0.6s  CTA buttons + social links stagger in
 *
 * The CTA "glow pulse" is a CSS pseudo-element (.cta-glow) animating opacity,
 * instead of an infinite box-shadow tween that repaints every frame.
 */
export const createHeroTimeline = (scope?: Element | null) => {
  const q = gsap.utils.selector(scope || document);
  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

  timeline
    .fromTo(q('.hero-background'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0)
    .fromTo(q('.hero-badge'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    .fromTo(q('.hero-title'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
    .fromTo(q('.hero-banner'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.2)
    .fromTo(q('.hero-heading'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, 0.35)
    .fromTo(q('.hero-subtitle'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
    .fromTo(
      q('.hero-cta, .hero-social'),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      0.6
    )
    .fromTo(q('.hero-scroll'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.1);

  return timeline;
};

export default createHeroTimeline;
