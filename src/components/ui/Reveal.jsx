import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const REVEAL_EASE = [0.22, 1, 0.36, 1];

/**
 * Shared scroll-reveal preset: fade + small rise, once, transform/opacity only.
 * Use `as` to change the wrapper element (default div).
 */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: REVEAL_EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Props to spread on an existing motion element to get the same reveal. */
export const revealProps = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: REVEAL_EASE, delay },
});
