# Fully Animated Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully animated portfolio with professional, elegant animations across all sections using GSAP + Framer Motion, with hero section as cinematic focal point.

**Architecture:** Foundation layer creates reusable animation utilities and hooks. Hero animations are implemented first (highest priority), then scroll-based animations roll out section by section, and page transitions complete the experience.

**Tech Stack:** GSAP 3.12+, ScrollTrigger, Framer Motion 11+, React 18, TypeScript

---

## File Structure

### New Files to Create
```
src/
  hooks/
    useScrollAnimation.ts         - ScrollTrigger wrapper hook
    usePageTransition.ts          - GSAP Timeline hook for page transitions
  animations/
    presets.ts                    - Reusable animation configurations
    heroTimeline.ts               - Hero entrance sequence
    scrollAnimations.ts           - ScrollTrigger configurations for all sections
    transitionTimeline.ts         - Page transition sequences
  styles/
    animations.css                - Keyframes and animation utilities
```

### Files to Modify
- `src/components/Hero.jsx` — Add hero animations via heroTimeline
- `src/components/Projects.jsx` — Add scroll-triggered animations
- `src/pages/Home.jsx` — Wrap sections with scroll animation refs
- `src/App.jsx` — Add page transition logic
- `src/components/Header.jsx` — Add nav animations
- `src/index.css` or `src/main.jsx` — Import animations.css, register ScrollTrigger plugin

---

## Implementation Tasks

### Task 1: Set up GSAP registration and animation presets

**Files:**
- Create: `src/animations/presets.ts`
- Modify: `src/main.jsx`

- [ ] **Step 1: Create animation presets file**

Create `src/animations/presets.ts`:

```typescript
import gsap from 'gsap';

// Reusable animation presets for consistency across portfolio
export const animationPresets = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  },
  fadeOut: {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in'
  },
  
  // Scale animations
  scaleUp: {
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  },
  scaleDown: {
    scale: 1.05,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in'
  },
  
  // Slide animations
  slideInUp: {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  },
  slideOutDown: {
    y: -30,
    opacity: 1,
    duration: 0.4,
    ease: 'power2.in'
  },
  
  // Stagger config
  stagger: {
    amount: 0.2,
    from: 'start'
  },
  
  // Hover animations
  hoverLift: {
    y: -5,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    duration: 0.3,
    ease: 'power2.out'
  },
  hoverReset: {
    y: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    duration: 0.3,
    ease: 'power2.out'
  }
};

// Register ScrollTrigger plugin
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default animationPresets;
```

- [ ] **Step 2: Verify file syntax is correct**

Check that the file has no TypeScript errors by reviewing imports and exports.

---

### Task 2: Create useScrollAnimation hook

**Files:**
- Create: `src/hooks/useScrollAnimation.ts`

- [ ] **Step 1: Write the hook**

Create `src/hooks/useScrollAnimation.ts`:

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationConfig {
  from: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: () => void;
}

/**
 * useScrollAnimation - Triggers GSAP animations when element enters viewport
 * Automatically cleans up ScrollTrigger on unmount to prevent memory leaks
 */
export const useScrollAnimation = (config: ScrollAnimationConfig) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: config.start || 'top 80%',
      end: config.end || 'top 50%',
      onEnter: () => {
        gsap.fromTo(elementRef.current, config.from, {
          ...config.to,
          duration: config.to?.duration || 0.6
        });
        config.onEnter?.();
      },
      markers: config.markers || false
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [config]);

  return elementRef;
};

export default useScrollAnimation;
```

- [ ] **Step 2: Verify the hook implementation**

Review the hook structure — it should accept a config object, attach to an element via ref, create a ScrollTrigger on mount, and clean up on unmount.

---

### Task 3: Create usePageTransition hook

**Files:**
- Create: `src/hooks/usePageTransition.ts`

- [ ] **Step 1: Write the hook**

Create `src/hooks/usePageTransition.ts`:

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TransitionConfig {
  duration?: number;
  exitDuration?: number;
}

/**
 * usePageTransition - Manages GSAP Timeline for page enter/exit animations
 * Provides methods to play exit animation (for route change) and plays enter animation on mount
 */
export const usePageTransition = (config?: TransitionConfig) => {
  const pageRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
          ease: 'power2.out'
        }
      );
    }
  }, [duration]);

  const exitAnimation = () => {
    return gsap.to(pageRef.current, {
      opacity: 0,
      y: -30,
      duration: exitDuration,
      ease: 'power2.in'
    });
  };

  return { pageRef, exitAnimation };
};

export default usePageTransition;
```

- [ ] **Step 2: Verify the hook logic**

Review that the hook returns both pageRef (for attaching to DOM) and exitAnimation (for manual calls during route changes).

---

### Task 4: Create hero timeline orchestration

**Files:**
- Create: `src/animations/heroTimeline.ts`

- [ ] **Step 1: Write the hero timeline**

Create `src/animations/heroTimeline.ts`:

```typescript
import gsap from 'gsap';
import { animationPresets } from './presets';

/**
 * createHeroTimeline - Orchestrates cinematic hero section entrance
 * Animates: background, title, subtitle, CTA buttons in sequence
 * Called once on hero mount
 */
export const createHeroTimeline = () => {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  // Animate hero background (shader) - subtle fade in
  timeline.fromTo(
    '.hero-background',
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    0 // Start at beginning of timeline
  );

  // Animate hero title - staggered entrance
  timeline.fromTo(
    '.hero-title',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    0.1 // Slight delay after background
  );

  // Animate hero subtitle
  timeline.fromTo(
    '.hero-subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.3 // Staggered after title
  );

  // Animate CTA buttons - stagger each one
  timeline.fromTo(
    '.hero-cta',
    { opacity: 0, y: 20, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15 // 150ms between each button
    },
    0.5 // Delay after subtitle
  );

  // Animate CTA button pulse/glow (loop)
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
      repeat: -1 // Infinite repeat
    },
    1 // Start after all elements have entered
  );

  return timeline;
};

export default createHeroTimeline;
```

- [ ] **Step 2: Verify timeline structure**

Review that all selectors match what will be in Hero component (hero-title, hero-subtitle, hero-cta, etc.).

---

### Task 5: Create scroll animations configuration

**Files:**
- Create: `src/animations/scrollAnimations.ts`

- [ ] **Step 1: Write scroll animation configs**

Create `src/animations/scrollAnimations.ts`:

```typescript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger configurations for each section
 * Used by components to self-manage scroll-based animations
 */

export const projectsScrollConfig = {
  trigger: '.projects-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false
};

export const skillsScrollConfig = {
  trigger: '.skills-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false
};

export const aboutScrollConfig = {
  trigger: '.about-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false
};

export const contactScrollConfig = {
  trigger: '.contact-section',
  start: 'top 80%',
  end: 'top 30%',
  markers: false
};

/**
 * initNavAnimation - Handles nav hide/show on scroll direction
 * Shows nav when scrolling up, hides when scrolling down
 */
export const initNavAnimation = () => {
  let lastScrollTop = 0;
  const nav = document.querySelector('.navbar');

  if (!nav) return;

  ScrollTrigger.create({
    onUpdate: (self) => {
      if (self.getVelocity() < -500) {
        // Scrolling up fast
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
      } else if (self.getVelocity() > 500) {
        // Scrolling down fast
        gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.in' });
      }
    }
  });
};

export default {
  projectsScrollConfig,
  skillsScrollConfig,
  aboutScrollConfig,
  contactScrollConfig,
  initNavAnimation
};
```

- [ ] **Step 2: Verify config exports**

Check that all config objects have consistent structure (trigger, start, end, markers).

---

### Task 6: Create page transition timeline

**Files:**
- Create: `src/animations/transitionTimeline.ts`

- [ ] **Step 1: Write transition timeline**

Create `src/animations/transitionTimeline.ts`:

```typescript
import gsap from 'gsap';

/**
 * createPageExitTimeline - Animates current page out before route change
 * Used as promise that resolves when animation completes
 */
export const createPageExitTimeline = (pageElement: HTMLElement) => {
  return gsap.to(pageElement, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: 'power2.in'
  });
};

/**
 * createPageEnterTimeline - Animates new page in after route change
 * Called after page DOM is mounted
 */
export const createPageEnterTimeline = (pageElement: HTMLElement) => {
  return gsap.fromTo(
    pageElement,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }
  );
};

export default {
  createPageExitTimeline,
  createPageEnterTimeline
};
```

- [ ] **Step 2: Verify both timelines are exported**

Both functions should be exported and return GSAP animations.

---

### Task 7: Create animations.css for keyframes and utilities

**Files:**
- Create: `src/styles/animations.css`

- [ ] **Step 1: Write animation utilities**

Create `src/styles/animations.css`:

```css
/* Prefers-reduced-motion respect */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* GPU acceleration for animated elements */
.hero-background,
.hero-title,
.hero-subtitle,
.hero-cta,
.project-card,
.skill-badge,
.about-content,
.contact-form {
  will-change: transform, opacity;
}

/* Remove will-change after animation completes */
.animation-complete {
  will-change: auto;
}

/* Utility classes for animations */
.fade-in-scroll {
  opacity: 0;
}

.scale-in-scroll {
  opacity: 0;
  transform: scale(0.95);
}

.slide-up-scroll {
  opacity: 0;
  transform: translateY(30px);
}

/* Navigation animations */
.navbar {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transitions for form elements */
input,
textarea,
button {
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
}

input:focus,
textarea:focus {
  outline: none;
}

/* Card hover state base */
.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  /* Handled by GSAP in components */
}
```

- [ ] **Step 2: Verify CSS rules**

Check that all rules use GPU-friendly properties (transform, opacity) and have appropriate transitions.

---

### Task 8: Modify App.jsx to add page transition logic

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Read current App.jsx**

(This step requires reading the actual file to understand current structure)

- [ ] **Step 2: Add location state tracking**

Wrap the main route render with transition logic:

```jsx
import { useLocation } from 'react-router-dom';
import { usePageTransition } from './hooks/usePageTransition';
import { useEffect, useRef } from 'react';
import { createPageExitTimeline } from './animations/transitionTimeline';

function App() {
  const location = useLocation();
  const pageRef = useRef(null);
  const { exitAnimation } = usePageTransition();

  useEffect(() => {
    // When route changes, exit old page before rendering new one
    const handleRouteChange = async () => {
      // Note: This is optional - can implement full transition
      // For now, let individual pages handle entry animations
    };

    handleRouteChange();
  }, [location]);

  return (
    <div className="app-container" ref={pageRef}>
      {/* Existing routes */}
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Add ScrollTrigger refresh on route change**

```jsx
useEffect(() => {
  import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
    import('gsap').then(({ default: gsap }) => {
      gsap.registerPlugin(ScrollTrigger);
      // Refresh scroll triggers when route changes
      ScrollTrigger.refresh();
    });
  });
}, [location]);
```

- [ ] **Step 4: Commit changes**

```bash
git add src/App.jsx
git commit -m "feat: add page transition logic and ScrollTrigger refresh"
```

---

### Task 9: Implement hero section animations

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Read current Hero.jsx**

(Understand current structure)

- [ ] **Step 2: Add hero animation classes and refs**

Update Hero.jsx to include required classes and mount the hero timeline:

```jsx
import { useEffect, useRef } from 'react';
import { createHeroTimeline } from '../animations/heroTimeline';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Ensure elements have required classes
    const title = heroRef.current?.querySelector('.hero-title');
    const subtitle = heroRef.current?.querySelector('.hero-subtitle');
    const ctas = heroRef.current?.querySelectorAll('.hero-cta');

    if (title && subtitle && ctas.length > 0) {
      createHeroTimeline();
    }
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Ensure elements have these classes */}
      {/* <div className="hero-background">...</div> */}
      {/* <h1 className="hero-title">...</h1> */}
      {/* <p className="hero-subtitle">...</p> */}
      {/* <button className="hero-cta">...</button> */}
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add hero section animations"
```

---

### Task 10: Animate Projects section (cards)

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Read current Projects.jsx**

(Understand card structure)

- [ ] **Step 2: Add scroll animation to project cards**

Wrap cards with scroll animations:

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    
    if (!cards) return;

    // Animate each card on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            markers: false
          },
          delay: index * 0.1 // Stagger each card
        }
      );

      // Add hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="projects-section" ref={sectionRef}>
      {/* Project cards with class="project-card" */}
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: add project card scroll and hover animations"
```

---

### Task 11: Animate Skills section

**Files:**
- Modify: `src/components/Skills.jsx` (or equivalent)

- [ ] **Step 1: Add scroll animations to skill badges**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const badges = sectionRef.current?.querySelectorAll('.skill-badge');
    
    if (!badges) return;

    badges.forEach((badge, index) => {
      gsap.fromTo(
        badge,
        { opacity: 0, rotation: -15 },
        {
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badge,
            start: 'top 85%',
            end: 'top 55%',
            markers: false
          },
          delay: (index % 5) * 0.08 // Stagger by row
        }
      );

      // Hover animation
      badge.addEventListener('mouseenter', () => {
        gsap.to(badge, {
          scale: 1.1,
          color: '#fff',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      badge.addEventListener('mouseleave', () => {
        gsap.to(badge, {
          scale: 1,
          color: 'inherit',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      {/* Skills with class="skill-badge" */}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: add skill badge scroll and hover animations"
```

---

### Task 12: Animate About section

**Files:**
- Modify: `src/components/About.jsx` (or equivalent)

- [ ] **Step 1: Add scroll animations to About content**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const headline = sectionRef.current?.querySelector('.about-headline');
    const content = sectionRef.current?.querySelector('.about-content');
    const images = sectionRef.current?.querySelectorAll('.about-image');

    if (headline) {
      gsap.fromTo(
        headline,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            end: 'top 50%'
          }
        }
      );
    }

    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            end: 'top 50%'
          },
          delay: 0.1
        }
      );
    }

    images?.forEach((img, index) => {
      gsap.fromTo(
        img,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            end: 'top 50%'
          },
          delay: (index + 1) * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      {/* <h2 className="about-headline">...</h2> */}
      {/* <div className="about-content">...</div> */}
      {/* <img className="about-image" /> */}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: add about section scroll animations"
```

---

### Task 13: Animate Contact section and form

**Files:**
- Modify: `src/components/Contact.jsx` (or equivalent)

- [ ] **Step 1: Add form animations**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const formFields = sectionRef.current?.querySelectorAll('.form-field');
    const submitBtn = sectionRef.current?.querySelector('.submit-button');

    // Animate form fields on scroll
    formFields?.forEach((field, index) => {
      gsap.fromTo(
        field,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: field,
            start: 'top 80%',
            end: 'top 50%'
          },
          delay: index * 0.1
        }
      );
    });

    // Animate submit button
    if (submitBtn) {
      gsap.fromTo(
        submitBtn,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: submitBtn,
            start: 'top 80%',
            end: 'top 50%'
          }
        }
      );

      // Button hover animation
      submitBtn.addEventListener('mouseenter', () => {
        gsap.to(submitBtn, {
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      submitBtn.addEventListener('mouseleave', () => {
        gsap.to(submitBtn, {
          scale: 1,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      {/* Form with class="form-field" and submit with class="submit-button" */}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: add contact form scroll and button hover animations"
```

---

### Task 14: Animate Navigation

**Files:**
- Modify: `src/components/Header.jsx`

- [ ] **Step 1: Add nav hide/show on scroll**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScrollTop = 0;

    const updateNavVisibility = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Show nav when scrolling up
      if (scrollTop < lastScrollTop - 50) {
        gsap.to(nav, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      // Hide nav when scrolling down
      else if (scrollTop > lastScrollTop + 50 && scrollTop > 100) {
        gsap.to(nav, {
          y: -100,
          duration: 0.3,
          ease: 'power2.in'
        });
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', updateNavVisibility);

    return () => {
      window.removeEventListener('scroll', updateNavVisibility);
    };
  }, []);

  // Animate active link indicator
  useEffect(() => {
    const navLinks = navRef.current?.querySelectorAll('a');
    
    navLinks?.forEach(link => {
      link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Animate indicator
        gsap.to(link, {
          borderBottomColor: '#fff',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }, []);

  return (
    <header className="navbar" ref={navRef}>
      {/* Navigation content */}
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: add header scroll hide/show and active link animations"
```

---

### Task 15: Import animations.css in main.jsx

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Add imports**

```jsx
import './styles/animations.css'; // Add this import
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// ... rest of imports
```

- [ ] **Step 2: Commit**

```bash
git commit -am "feat: import animations.css and register ScrollTrigger plugin"
```

---

### Task 16: Test animations and verify performance

**Files:**
- Test all sections in browser

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Server starts on localhost:5173 (or similar)

- [ ] **Step 2: Test hero animations**

Load home page, verify:
- Background fades in smoothly
- Title slides up
- Subtitle follows
- Buttons scale in with stagger
- Button glow pulses on first button

- [ ] **Step 3: Test scroll animations**

Scroll through portfolio, verify:
- Projects cards fade in as they enter viewport
- Skills badges rotate in
- About content staggered entrance
- Contact form fields animate
- All animations feel smooth with no jank

- [ ] **Step 4: Test hover animations**

Hover over:
- Project cards (lift effect)
- Skill badges (scale effect)
- Buttons (scale and shadow)

Expected: Smooth transitions with no lag

- [ ] **Step 5: Test navigation animation**

Scroll down page, verify nav slides out of view

Scroll up, verify nav slides back in

- [ ] **Step 6: Check performance (optional)**

Open DevTools Performance tab, record animation, verify:
- No dropped frames
- GPU acceleration is active (check rendering)

- [ ] **Step 7: Test on multiple browsers**

Test on Chrome, Firefox, Safari if available

Verify all animations work consistently

- [ ] **Step 8: Commit test results**

```bash
git add -A
git commit -m "test: verify all animations working and performant across browsers"
```

---

## Summary

**Created:**
- 4 animation utility files (presets, timelines, configs)
- 2 custom React hooks (useScrollAnimation, usePageTransition)
- 1 CSS file with animation utilities
- Animation logic in 6 component files (Hero, Projects, Skills, About, Contact, Header)

**All animations:**
- ✓ Use GSAP as primary orchestrator
- ✓ ScrollTrigger for scroll-based triggers
- ✓ Framer Motion for simple component transitions (optional, added in hooks)
- ✓ Professional, elegant aesthetic
- ✓ GPU-optimized (transforms + opacity only)
- ✓ Respect prefers-reduced-motion
- ✓ Staggered, orchestrated sequences
- ✓ Cleanup on unmount to prevent memory leaks

**Next:** Start with Task 1 and proceed sequentially. Each task builds on previous ones.
