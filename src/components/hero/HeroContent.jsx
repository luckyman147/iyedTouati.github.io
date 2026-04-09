import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Icon } from '@iconify/react';

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-plasma opacity-0 group-hover:opacity-50 group-hover:animate-glitch translate-x-1">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-20 text-solar opacity-0 group-hover:opacity-50 group-hover:animate-glitch -translate-x-1">
        {text}
      </span>
    </div>
  );
};

export default function HeroContent({ name, heading, typingText, description, btnText, btnUrl }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="scifi-badge mb-4">Transmission Received</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-bold tracking-tighter leading-tight break-words">
          <GlitchText text={name} />
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-4 text-plasma/80 font-mono text-sm md:text-lg">
          <span className="w-12 h-[1px] bg-plasma/30" />
          <span className="uppercase tracking-[0.3em]">{heading}</span>
        </div>
        
        <p 
          className="text-lg md:text-xl text-white/70 font-rajdhani leading-relaxed max-w-xl border-l-2 border-plasma/20 pl-6 py-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap gap-6 mt-4"
      >
    
      </motion.div>
    </div>
  );
}
