import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP animation presets for the portfolio
 * These presets define common animation properties and easing functions
 */
export const animationPresets = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  fadeOut: {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in',
  },

  // Scale animations
  scaleUp: {
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
  scaleDown: {
    scale: 1.05,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in',
  },

  // Slide animations
  slideInUp: {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  slideOutDown: {
    y: -30,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in',
  },

  // Stagger configuration for multiple elements
  stagger: {
    amount: 0.2,
    from: 'start',
  },

  // Hover effects
  hoverLift: {
    y: -5,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    duration: 0.3,
    ease: 'power2.out',
  },
  hoverReset: {
    y: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    duration: 0.3,
    ease: 'power2.out',
  },
} as const;

export default animationPresets;
