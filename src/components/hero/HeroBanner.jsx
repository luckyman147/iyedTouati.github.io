import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner({ imgUrl }) {
  return (
    <div className="relative flex items-center justify-center min-h-[290px] sm:min-h-[360px] md:min-h-[500px]">
      {/* Outer Pulse Ring */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.15, 0.05], rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] md:w-[550px] md:h-[550px] border border-plasma/20 rounded-full"
      />

      {/* Middle Spinning Ring */}
      <motion.div
        animate={{ scale: [1, 1.02, 1], rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[480px] md:h-[480px] border border-dashed border-solar/20 rounded-full"
      />

      {/* Inner Core — static glow + transform-only breathing (no animated box-shadow) */}
      <motion.div
        animate={{ scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-[210px] h-[210px] sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-void via-plasma/10 to-void
                   flex items-center justify-center overflow-hidden border border-plasma/30
                   shadow-[0_0_30px_rgba(0,212,255,0.15)]"
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
              fetchpriority="high"
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
