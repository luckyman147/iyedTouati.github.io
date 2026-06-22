import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner({ imgUrl }) {
  const [baseSize, setBaseSize] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 400 : 256
  );

  useEffect(() => {
    const update = () => setBaseSize(window.innerWidth >= 768 ? 400 : 256);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[500px]">
      {/* Outer Pulse Ring */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.15, 0.05], rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[320px] h-[320px] md:w-[550px] md:h-[550px] border border-plasma/20 rounded-full"
      />

      {/* Middle Spinning Ring */}
      <motion.div
        animate={{ scale: [1, 1.02, 1], rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[260px] h-[260px] md:w-[480px] md:h-[480px] border border-dashed border-solar/20 rounded-full"
      />

      {/* Inner Core */}
      <motion.div
        animate={{
          width: baseSize,
          height: baseSize,
          borderRadius: '50%',
          scale: [0.98, 1.02, 0.98],
          boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.1)',
            '0 0 40px rgba(0, 212, 255, 0.2)',
            '0 0 20px rgba(0, 212, 255, 0.1)',
          ],
        }}
        transition={{
          width: { duration: 0 },
          height: { duration: 0 },
          borderRadius: { duration: 0 },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative bg-gradient-to-tr from-void via-plasma/10 to-void
                   flex items-center justify-center overflow-hidden border border-plasma/30"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,212,255,0.2)_0%,transparent_70%)] z-10 pointer-events-none" />

        {/* Image */}
        <AnimatePresence>
          {imgUrl && (
            <motion.img
              key="hero-image"
              src={imgUrl}
              alt="Hero Avatar"
              fetchPriority="high"
              loading="eager"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover object-top z-20 grayscale brightness-125 contrast-125"
            />
          )}
        </AnimatePresence>

        {!imgUrl && (
          <span className="text-plasma font-orbitron text-sm tracking-widest animate-pulse relative z-20">
            WARP CORE
          </span>
        )}
      </motion.div>
    </div>
  );
}
