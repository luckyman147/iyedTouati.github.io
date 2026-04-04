import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const ProjectCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, z: -500 }}
      whileInView={{ opacity: 1, x: 0, z: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.2, type: "spring" }}
      className="group relative perspective-1000"
    >
      <div className="glass-panel group-hover:border-plasma/60 transition-all duration-500 overflow-hidden">
        {/* Project Image/Video Thumb */}
        <div className="relative h-64 overflow-hidden">
          {item.videoUrl && item.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video 
              src={item.videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <img 
              src={item.thumbUrl || item.videoUrl} 
              alt={item.title}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
          
          {/* Mission Overlay */}
          <div className="absolute top-4 left-4">
            <span className="scifi-badge bg-void/80">Mission #{index + 1}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 relative">
          {/* Diagnostic Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="flex flex-col gap-1">
            <h5 className="text-xl font-orbitron font-bold text-white group-hover:text-plasma transition-colors uppercase tracking-tighter">
              {item.title}
            </h5>
            <span className="text-[10px] font-mono text-plasma/60 uppercase tracking-[0.2em]">
              {item.subTitle}
            </span>
          </div>

          <p className="text-sm font-rajdhani text-white/70 line-clamp-2">
            {item.details?.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {item.details?.frameworks?.split(',').map((fw, i) => (
              <span key={i} className="text-[9px] font-mono px-2 py-0.5 border border-plasma/20 bg-plasma/5 text-plasma/80 rounded uppercase">
                {fw.trim()}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-plasma/10">
            <div className="flex gap-4">
              <a href="#" className="text-plasma/60 hover:text-plasma transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group/link">
                <Icon icon="lucide:github" />
                <span>Coordinates</span>
              </a>
              <a href="#" className="text-solar/60 hover:text-solar transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group/link">
                <Icon icon="lucide:external-link" />
                <span>Portal</span>
              </a>
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>
    </motion.div>
  );
};

export default function Projects({ data }) {
  const { sectionHeading, allProjects } = data;

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden bg-void" id="project">
      {/* Multiverse Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
         <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_80%)]" />
         {/* Fake timeline lines */}
         <svg className="w-full h-full opacity-30">
            <line x1="10%" y1="0" x2="90%" y2="100%" stroke="currentColor" className="text-plasma/20" strokeWidth="0.5" />
            <line x1="90%" y1="0" x2="10%" y2="100%" stroke="currentColor" className="text-plasma/20" strokeWidth="0.5" />
         </svg>
      </div>

      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-plasma/40" />
            <span className="scifi-badge">{sectionHeading.miniTitle || "Chronicles"}</span>
            <div className="w-12 h-[1px] bg-plasma/40" />
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold tracking-tighter">
            {sectionHeading.title.replace('<span>', '').replace('</span>', '') || "Missions Across Time"}
          </h2>
          <div className="text-[10px] text-plasma/40 font-mono tracking-[0.5em] uppercase">
            Accessing Multiverse Repository...
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {allProjects?.map((item, index) => (
            <ProjectCard 
              key={index} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Hyperspace Tunnel Frame */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none z-20" />
    </section>
  );
}
