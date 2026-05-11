import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Configuration object for page transition animations
 * Defines the animation behavior when page enters/exits
 */
interface TransitionConfig {
  /** Duration of the page enter animation in seconds (default: 0.6) */
  duration?: number;
  /** Duration of the page exit animation in seconds (default: 0.4) */
  exitDuration?: number;
}

/**
 * Hook for managing GSAP Timeline for page enter/exit animations when routes change
 * Handles fade-in on mount and provides method for exit animations
 *
 * @param config - Optional configuration object with duration and exitDuration
 * @returns Object containing pageRef (to attach to page element) and exitAnimation (method to call on route change)
 *
 * @example
 * ```tsx
 * const { pageRef, exitAnimation } = usePageTransition({ duration: 0.8 });
 *
 * useEffect(() => {
 *   // Call exitAnimation before navigation
 *   const handleNavigation = async () => {
 *     await exitAnimation();
 *     navigate('/next-page');
 *   };
 * }, []);
 *
 * return <div ref={pageRef}>Page Content</div>;
 * ```
 */
export const usePageTransition = (config?: TransitionConfig) => {
  const pageRef = useRef<HTMLElement>(null);

  const duration = config?.duration || 0.6;
  const exitDuration = config?.exitDuration || 0.4;

  useEffect(() => {
    // Play enter animation when component mounts
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: 'power2.out',
        }
      );
    }
  }, [duration]);

  useEffect(() => {
    return () => {
      // Kill any active animations on unmount
      if (pageRef.current) {
        gsap.killTweensOf(pageRef.current);
      }
    };
  }, []);

  /**
   * Animates the page exit transition
   * Should be called before navigating to a new page/route
   *
   * @returns GSAP Tween animation that can be awaited
   */
  const exitAnimation = useCallback(() => {
    if (!pageRef.current) {
      console.warn('usePageTransition: pageRef is not attached to an element');
      return gsap.to({}, { duration: 0 }); // Return empty tween
    }
    return gsap.to(pageRef.current, {
      opacity: 0,
      y: -30,
      duration: exitDuration,
      ease: 'power2.in',
    });
  }, [exitDuration]);

  return { pageRef, exitAnimation };
};

export default usePageTransition;
