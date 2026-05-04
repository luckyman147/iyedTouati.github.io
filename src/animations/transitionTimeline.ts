import gsap from 'gsap';

/**
 * Creates a GSAP timeline for page exit animation
 * Animates opacity from 1 to 0 and y from 0 to -30
 */
export function createPageExitTimeline(pageElement: HTMLElement): gsap.core.Tween {
  return gsap.to(pageElement, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: 'power2.in',
  });
}

/**
 * Creates a GSAP timeline for page enter animation
 * Animates opacity from 0 to 1 and y from 30 to 0
 */
export function createPageEnterTimeline(pageElement: HTMLElement): gsap.core.Tween {
  return gsap.fromTo(
    pageElement,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }
  );
}
