import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ScrollTrigger is registered in src/animations/presets.ts
// but we ensure it's available here as well
gsap.registerPlugin(ScrollTrigger);

/**
 * Configuration object for scroll-triggered animations
 * Defines the animation behavior when element enters the viewport
 */
interface ScrollAnimationConfig {
  /** GSAP tween variables for the starting state (required) */
  from: gsap.TweenVars;
  /** Optional GSAP tween variables for the ending state */
  to?: gsap.TweenVars;
  /** Optional element to use as trigger (defaults to the ref element) */
  trigger?: string | Element;
  /** When animation should start (default: 'top 80%') */
  start?: string;
  /** When animation should end (default: 'top 50%') */
  end?: string;
  /** Enable scrubbing or set scrub value (default: false) */
  scrub?: boolean | number;
  /** Show ScrollTrigger markers for debugging (default: false) */
  markers?: boolean;
  /** Callback function when element enters viewport */
  onEnter?: () => void;
}

/**
 * Hook for creating scroll-triggered GSAP animations
 * Automatically sets up and cleans up ScrollTrigger instances
 *
 * @param config - Configuration object with animation properties
 * @returns ref - React ref to attach to the element you want to animate
 *
 * @example
 * ```tsx
 * const ref = useScrollAnimation({
 *   from: { opacity: 0, y: 30 },
 *   to: { opacity: 1, y: 0, duration: 0.6 },
 *   start: 'top 80%',
 *   onEnter: () => console.log('Element entered!')
 * });
 *
 * return <div ref={ref}>Content</div>;
 * ```
 */
export const useScrollAnimation = (config: ScrollAnimationConfig) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Create the animation timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: config.trigger || elementRef.current,
        start: config.start || 'top 80%',
        end: config.end || 'top 50%',
        scrub: config.scrub ?? false,
        markers: config.markers ?? false,
        onEnter: () => {
          config.onEnter?.();
        },
      },
    });

    // Add the fromTo animation to the timeline
    timeline.fromTo(
      elementRef.current,
      config.from,
      {
        ...config.to,
        duration: config.to?.duration || 0.6,
      }
    );

    // Cleanup function to kill the scroll trigger and timeline
    return () => {
      timeline.kill();
      timeline.scrollTrigger?.kill();
    };
  }, [config]);

  return elementRef;
};

export default useScrollAnimation;
