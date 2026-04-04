import { Icon } from '@iconify/react';
import React from 'react';
import { motion } from 'framer-motion';

const scifiLabels = {
  'React Development': 'Dynamic Holographic UI',
  'Angular Framework': 'Modular Structure Engine',
  'Kotlin / Android': 'Native Android Core',
  '.NET Core / C#': 'Enterprise Backend Grid',
  'NestJS & Node.js': 'Microservice Orchestrator',
  'Spring Boot / Java': 'Mission-Critical Core',
};

export default function ServiceItem({ item, index }) {
  const scifiLabel = scifiLabels[item.title] || 'System Module';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-plasma/20 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      
      <div className="glass-panel p-6 flex flex-col items-center text-center gap-4 border-plasma/10 hover:border-plasma/40 transition-all duration-500 group-hover:-translate-y-2">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border border-plasma/30 flex items-center justify-center bg-void/60 group-hover:border-plasma group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-500">
            <Icon 
              icon={item.icon} 
              className="text-3xl text-plasma group-hover:scale-125 transition-transform duration-500"
            />
          </div>
          {/* Orbital Ring */}
          <div className="absolute -inset-2 border border-plasma/10 rounded-full animate-spin-slow opacity-50 pointer-events-none" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-plasma/60 uppercase tracking-widest">
            {scifiLabel}
          </span>
          <h5 className="text-lg font-orbitron text-white group-hover:text-plasma transition-colors">
            {item.title}
          </h5>
        </div>

        <p className="text-sm font-rajdhani text-white/60 line-clamp-3">
          {item.subTitle}
        </p>

        {/* Proficiency Bar */}
        <div className="w-full h-1 bg-void border border-plasma/10 mt-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '90%' }} 
            viewport={{ once: true }}
            className="h-full bg-plasma/40 group-hover:bg-plasma/80"
          />
        </div>
      </div>
    </motion.div>
  );
}
