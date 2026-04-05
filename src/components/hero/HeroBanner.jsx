import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBanner({ imgUrl }) {
  return (
    <div className="relative flex items-center justify-center min-h-[500px]">
      {/* Outer Pulse Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: 360
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-plasma/30 rounded-full"
      />
      
      {/* Middle Spinning Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: -360
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] border-2 border-dashed border-solar/40 rounded-full"
      />
      
      {/* Inner Core Portal */}
      <motion.div
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          boxShadow: [
            "0 0 30px rgba(0, 212, 255, 0.3)",
            "0 0 60px rgba(0, 212, 255, 0.6)",
            "0 0 30px rgba(0, 212, 255, 0.3)"
          ]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-tr from-void via-plasma/20 to-void 
                   rounded-full flex items-center justify-center overflow-hidden border-2 border-plasma/50"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,212,255,0.4)_0%,transparent_70%)] z-10 pointer-events-none" />
        
        {/* Warp particles (CSS) */}
        <div className="absolute w-full h-full animate-spin-slow opacity-30 z-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 w-[1px] h-16 bg-plasma"
              style={{ 
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                transformOrigin: 'bottom center'
              }}
            />
          ))}
        </div>
        
        {/* User Image */}
        {imgUrl ? (
          <img 
            src={imgUrl} 
            alt="Hero Avatar" 
            className="w-full h-full object-cover object-top relative z-20 grayscale brightness-125 contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-700 pointer-events-auto cursor-crosshair" 
          />
        ) : (
          <span className="text-plasma font-orbitron text-sm tracking-widest animate-pulse relative z-20">WARP CORE</span>
        )}
      </motion.div>
    </div>
  );
}
