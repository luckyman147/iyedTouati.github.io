import { Icon } from '@iconify/react';
import React from 'react';
import { motion } from 'framer-motion';
import { revealProps } from '../ui/Reveal';
import { useTilt } from '../../hooks/useTilt';

const scifiLabels = {
  'React Development': 'Dynamic Holographic UI',
  'Angular Framework': 'Modular Structure Engine',
  'Kotlin / Android': 'Native Android Core',
  '.NET Core / C#': 'Enterprise Backend Grid',
  'NestJS & Node.js': 'Microservice Orchestrator',
  'Spring Boot / Java': 'Mission-Critical Core',
  'Flutter Development': 'Cross-Platform Engine',
};

export default function ServiceItem({ item, index }) {
  const scifiLabel = scifiLabels[item.title] || 'System Module';
  const tiltRef = useTilt(6);

  return (
    <motion.div
      {...revealProps(Math.min(index * 0.1, 0.4))}
      className="group relative"
    >
      <div className="absolute inset-0 bg-plasma/20 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      
      <div
        ref={tiltRef}
        className="glass-panel card-glow h-full p-4 md:p-6 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 border-plasma/10 hover:border-plasma/40 transition-colors duration-500"
      >
        <div className="relative shrink-0 mt-1 md:mt-0">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-plasma/30 flex items-center justify-center bg-void/60 group-hover:border-plasma group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-500">
            <Icon 
              icon={item.icon} 
              className="text-2xl md:text-3xl text-plasma group-hover:scale-125 transition-transform duration-500"
            />
          </div>
          {/* Orbital Ring */}
          <div className="absolute -inset-2 border border-plasma/10 rounded-full animate-spin-slow opacity-50 pointer-events-none" />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-plasma/60 uppercase tracking-widest">
              {scifiLabel}
            </span>
            <h5 className="text-base md:text-lg font-orbitron text-white group-hover:text-plasma transition-colors">
              {item.title}
            </h5>
          </div>
          <p className="text-sm font-rajdhani text-white/60 line-clamp-3">{item.subTitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
