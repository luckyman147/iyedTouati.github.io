import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Type definition for animation preset properties
 * Defines all possible animation properties that can be applied to elements
 */
export interface AnimationPreset {
  opacity?: number;
  scale?: number;
  y?: number;
  duration?: number;
  ease?: string;
  boxShadow?: string;
  amount?: number;
  from?: string;
}

/**
 * Reusable GSAP animation presets for the portfolio
 * These presets define common animation properties and easing functions.
 *
 * Duration Strategy:
 * - Entry animations (fade-in, scale-up, slide-in): 0.6s for gradual, polished appearance
 * - Exit animations (fade-out, scale-down, slide-out): 0.4s for snappier exit behavior
 * - This timing hierarchy improves UX by making content appear more gradually while disappearing quickly
 * - Hover effects use 0.3s for instant feedback to user interactions
 */
export const animationPresets = {
  // Fade animations
  /**
   * Fade-in animation. Animates FROM opacity: 0 TO opacity: 1
   * Use for smooth appearance of elements on page load or entry
   */
  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  /**
   * Fade-out animation. Animates FROM opacity: 1 TO opacity: 0
   * Use for smooth disappearance of elements on exit
   */
  fadeOut: {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in',
  },

  // Scale animations
  /**
   * Scale-up animation. Animates FROM scale: 0.95 + opacity: 0 TO scale: 1 + opacity: 1
   * Creates a subtle zoom-in effect with elastic bounce using back.out easing
   * Use for prominent element entrance that draws attention
   */
  scaleUp: {
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
  /**
   * Scale-down animation. Animates FROM scale: 1.05 + opacity: 1 TO scale: 1 + opacity: 0
   * Creates a subtle zoom-out effect with fade on element exit
   */
  scaleDown: {
    scale: 1.05,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in',
  },

  // Slide animations
  /**
   * Slide-up animation. Animates FROM y: 30px (below) + opacity: 0 TO y: 0 (final position) + opacity: 1
   * Element starts 30px below its final position and slides UP into place
   * Use for staggered content entrance from bottom of viewport
   */
  slideInUp: {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  /**
   * Slide-down animation. Animates FROM y: -30px (above) + opacity: 1 TO y: 0 (below) + opacity: 0
   * Element slides DOWN and out of view on element exit
   */
  slideOutDown: {
    y: -30,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in',
  },

  // Stagger configuration for multiple elements
  /**
   * Stagger timing for animating multiple elements in sequence
   * amount: 0.2s delay between each element
   * from: 'start' means stagger begins from the first element
   * Use with timeline or batch animations to create cascading effects
   */
  stagger: {
    amount: 0.2,
    from: 'start',
  },

  // Hover effects
  /**
   * Hover lift animation. Animates FROM y: 0 TO y: -5px (lifted) + enhanced box shadow
   * Use on interactive elements to provide visual feedback on hover
   */
  hoverLift: {
    y: -5,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    duration: 0.3,
    ease: 'power2.out',
  },
  /**
   * Hover reset animation. Animates FROM lifted state back TO original position
   * Resets y: 0 and restores original subtle box shadow on hover exit
   */
  hoverReset: {
    y: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    duration: 0.3,
    ease: 'power2.out',
  },
} as const;

export { animationPresets };
