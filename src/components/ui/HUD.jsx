import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chapters = [
  { id: 'home', label: 'THE VOID', index: 0 },
  { id: 'about', label: 'COSMIC DATA', index: 1 },
  { id: 'services', label: 'QUANTUM LAB', index: 2 },
  { id: 'project', label: 'MISSIONS', index: 3 },
  { id: 'experience', label: 'HERO\'S CODEX', index: 4 },
  { id: 'contactus', label: 'TRANSMISSION', index: 5 },
];

const HUD = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });
  const [warpProgress, setWarpProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      // Find active chapter
      for (const chapter of [...chapters].reverse()) {
        const element = document.getElementById(chapter.id);
        if (element && scrollPos >= element.offsetTop) {
          setActiveChapter(chapter);
          break;
        }
      }

      // Update warp progress (0 to 1 based on total scroll)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalScroll;
      setWarpProgress(progress);

      // Update coordinates
      setCoords({
        x: (window.scrollY * 0.12).toFixed(2),
        y: (window.scrollY * 0.08).toFixed(2),
        z: (window.scrollY * 1.5).toFixed(2),
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-6 pt-24 hidden lg:flex flex-col justify-between font-mono">
      {/* Top HUD Frame */}
      <div className="flex justify-between items-start">
        <motion.div 
          key={activeChapter.id}
          initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-plasma/50 flex items-center justify-center bg-plasma/5 backdrop-blur-sm relative group pointer-events-auto cursor-crosshair">
               <div className="absolute inset-0 border border-plasma/20 animate-pulse" />
               <span className="text-plasma text-xl font-orbitron">MT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-plasma/40 tracking-[0.4em] uppercase">Sector Alpha // Log</span>
              <span className="text-lg text-white font-orbitron tracking-tighter leading-none glow-text">
                {activeChapter.label}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-end gap-2">
            <div className="text-[9px] text-plasma/40 tracking-widest uppercase">Temporal Coordinates</div>
            <div className="flex flex-col items-end gap-1 text-[11px] text-plasma bg-void/60 backdrop-blur-sm p-3 border-r-2 border-plasma/50 font-mono">
                <div className="flex gap-4">
                   <span className="opacity-40">X:</span> {coords.x} AU
                </div>
                <div className="flex gap-4">
                   <span className="opacity-40">Y:</span> {coords.y} AU
                </div>
                <div className="flex gap-4">
                   <span className="opacity-40">Z:</span> {coords.z} LY
                </div>
            </div>
        </div>
      </div>

      {/* Side Status Bars */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
         <div className="h-48 w-1 bg-void border border-plasma/10 relative overflow-hidden">
            <motion.div 
               className="absolute bottom-0 w-full bg-plasma shadow-[0_0_10px_#00d4ff]"
               animate={{ height: `${warpProgress * 100}%` }}
            />
         </div>
         <span className="text-[8px] text-plasma/40 uppercase [writing-mode:vertical-lr] tracking-[0.5em]">System Vitality</span>
      </div>

      {/* Bottom HUD Frame */}
      <div className="flex flex-col items-center gap-6">
        {/* Navigation Interface */}
        <div className="flex gap-6 p-3 bg-void/60 backdrop-blur-xl border border-plasma/10 rounded-full pointer-events-auto px-8 relative">
           <div className="absolute inset-0 border border-plasma/5 rounded-full pointer-events-none" />
           {chapters.map((chapter) => (
             <button 
               key={chapter.id}
               onClick={() => scrollToChapter(chapter.id)}
               className="relative group transition-all duration-300"
               title={chapter.label}
             >
               <div className={`w-2 h-2 rounded-full transition-all duration-500 hover:scale-150 ${
                 activeChapter.id === chapter.id 
                   ? 'bg-plasma shadow-[0_0_12px_#00d4ff] scale-150' 
                   : 'bg-plasma/20 group-hover:bg-plasma/60'
               }`} />
               
               {/* Tooltip */}
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-void/90 border border-plasma/30 px-3 py-1 rounded text-[9px] whitespace-nowrap text-plasma font-mono tracking-widest uppercase">
                    Warp To: {chapter.label}
                  </div>
               </div>
             </button>
           ))}
        </div>

        <div className="w-full max-w-sm flex flex-col gap-1 items-center">
          <div className="flex justify-between w-full text-[9px] text-plasma/40 tracking-[0.3em] uppercase px-1">
             <span>Warp Drive Level</span>
             <span>{Math.round(warpProgress * 100)}%</span>
          </div>
          <div className="h-[2px] w-full bg-void border border-plasma/10 relative">
             <motion.div 
               className="h-full bg-plasma"
               animate={{ width: `${warpProgress * 100}%` }}
               transition={{ type: "spring", stiffness: 30, damping: 15 }}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUD;
