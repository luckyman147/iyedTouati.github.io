import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configuration objects for each section's ScrollTrigger behavior
export const projectsScrollConfig = {
  trigger: '.projects-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false,
};

export const skillsScrollConfig = {
  trigger: '.skills-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false,
};

export const aboutScrollConfig = {
  trigger: '.about-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false,
};

export const contactScrollConfig = {
  trigger: '.contact-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false,
};

/**
 * Initializes navigation animation based on scroll velocity
 * Shows nav when scrolling up (velocity < -500)
 * Hides nav when scrolling down (velocity > 500)
 */
export function initNavAnimation(): void {
  const navbar = document.querySelector('.navbar') as HTMLElement;

  if (!navbar) {
    console.warn('Navbar element not found for scroll animation');
    return;
  }

  let lastVelocity = 0;

  ScrollTrigger.create({
    onUpdate: (self) => {
      lastVelocity = self.getVelocity();

      // Show nav when scrolling up
      if (lastVelocity < -500) {
        gsap.to(navbar, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      // Hide nav when scrolling down
      else if (lastVelocity > 500) {
        gsap.to(navbar, {
          y: -100,
          duration: 0.3,
          ease: 'power2.in',
          overwrite: 'auto',
        });
      }
    },
  });
}
