import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Thin glowing top bar. Driven by motion values -> no React re-renders on scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none
                 bg-gradient-to-r from-quantum via-plasma to-plasma shadow-[0_0_8px_rgba(0,212,255,0.7)]"
    />
  );
}
