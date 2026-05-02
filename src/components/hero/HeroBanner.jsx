import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBanner({ imgUrl }) {
  return (
    <div className="relative flex items-center justify-center min-h-[500px]">
      {/* Outer Pulse Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.15, 0.05],
          rotate: 360
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute w-[320px] h-[320px] md:w-[550px] md:h-[550px] border border-plasma/20 rounded-full"
      />
      
      {/* Middle Spinning Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          rotate: -360
        }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute w-[260px] h-[260px] md:w-[480px] md:h-[480px] border border-dashed border-solar/20 rounded-full"
      />
      
      {/* Inner Core Portal */}
      <motion.div
        animate={{ 
          scale: [0.98, 1.02, 0.98],
          boxShadow: [
            "0 0 20px rgba(0, 212, 255, 0.1)",
            "0 0 40px rgba(0, 212, 255, 0.2)",
            "0 0 20px rgba(0, 212, 255, 0.1)"
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-64 h-64 md:w-[400px] md:h-[400px] bg-gradient-to-tr from-void via-plasma/10 to-void 
                   rounded-full flex items-center justify-center overflow-hidden border border-plasma/30"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,212,255,0.2)_0%,transparent_70%)] z-10 pointer-events-none" />
        
        {/* User Image */}
        {imgUrl ? (
          <img 
            src={imgUrl} 
            alt="Hero Avatar" 
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-top relative z-20 grayscale brightness-125 contrast-125 hover:grayscale-0 hover:scale-110 transition-all duration-700 pointer-events-auto cursor-crosshair" 
          />
        ) : (
          <span className="text-plasma font-orbitron text-sm tracking-widest animate-pulse relative z-20">WARP CORE</span>
        )}
      </motion.div>
    </div>
  );
}
