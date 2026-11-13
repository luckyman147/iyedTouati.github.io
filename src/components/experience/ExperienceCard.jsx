import React from 'react';
import { motion } from 'framer-motion';
import { revealProps } from '../ui/Reveal';

const formatDuration = (duration) => {
  return duration.toUpperCase();
};

const bulletColors = ['text-plasma', 'text-solar', 'text-emerald-400', 'text-violet-400', 'text-amber-400', 'text-cyan-400'];
const nodeColors = ['border-plasma', 'border-solar', 'border-emerald-400', 'border-violet-400', 'border-amber-400', 'border-cyan-400'];

export default function ExperienceCard({ item, index, total }) {
  const isLast = index === total - 1;
  const durationText = formatDuration(item.duration || '');

  return (
    <motion.div
      {...revealProps(Math.min(index * 0.1, 0.4))}
      className="relative pl-8 md:pl-12 pb-12 md:pb-16 last:pb-0 mt-8 group"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[7px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-plasma/40 to-transparent" />
      )}
      
      {/* Timeline Node */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className={`absolute left-0 top-1 w-4 h-4 border-2 ${nodeColors[index % nodeColors.length]} bg-void rounded-full z-10 shadow-[0_0_8px_rgba(0,212,255,0.3)] group-hover:scale-125 transition-all duration-500`}
      />

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-[10px] font-mono text-plasma tracking-[0.3em] uppercase animate-pulse">
              {durationText}
            </span>
            <span className="scifi-badge text-[9px] py-0 px-2 opacity-60">
              {item.jobType}
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-orbitron font-bold text-white group-hover:text-plasma transition-colors tracking-tighter">
            {item.designation}
          </h4>
          <span className="text-xs md:text-sm font-mono text-solar/80 italic tracking-wider md:tracking-widest break-words">
            {`// @${item.company.toUpperCase()}`}
          </span>
        </div>

        {/* Content Body */}
        <div className="glass-panel p-4 md:p-6 border-plasma/10 group-hover:border-plasma/30 transition-all duration-500 relative">
          {/* Rune Background Accent */}
          <div className="absolute top-2 right-4 text-4xl opacity-[0.03] font-serif pointer-events-none select-none">
            ᚛ ᚐᚅᚔᚋᚐ ᚜
          </div>
          
          <h5 className="text-base md:text-lg font-orbitron text-plasma/80 mb-3 border-b border-plasma/10 pb-2">
            {item.companyTitle}
          </h5>
          <ul className="space-y-2">
            {item.companyDescription.split('.').filter(s => s.trim()).map((sentence, i) => (
              <li key={i} className="text-base font-rajdhani text-white/70 leading-relaxed flex items-start gap-2">
                <span className={`${bulletColors[i % bulletColors.length]} mt-1.5 flex-shrink-0`}>&#9656;</span>
                <span>{sentence.trim()}.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
