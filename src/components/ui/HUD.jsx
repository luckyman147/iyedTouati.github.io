import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const chapters = [
  { id: 'home', label: 'THE VOID', index: 0 },
  { id: 'about', label: 'COSMIC DATA', index: 1 },
  { id: 'services', label: 'QUANTUM LAB', index: 2 },
  { id: 'project', label: 'MISSIONS', index: 3 },
  { id: 'experience', label: "HERO'S CODEX", index: 4 },
  { id: 'education', label: 'ACADEMY', index: 5 },
  { id: 'certifications', label: 'BADGES', index: 6 },
  { id: 'contactus', label: 'TRANSMISSION', index: 7 },
];

const HUD = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const coordX = useRef(null);
  const coordY = useRef(null);
  const coordZ = useRef(null);
  const vBar = useRef(null);
  const hBar = useRef(null);
  const pct = useRef(null);

  // Active chapter: IntersectionObserver (no layout reads on scroll).
  // Also flags the section as `is-active` for the one-shot heading glow.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const chapter = chapters.find((c) => c.id === entry.target.id);
          if (chapter) setActiveChapter(chapter);
          entry.target.classList.add('is-active');
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Coordinates + warp bars: direct DOM writes, rAF-throttled.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, y / total) : 0;
      if (coordX.current) coordX.current.textContent = (y * 0.12).toFixed(2);
      if (coordY.current) coordY.current.textContent = (y * 0.08).toFixed(2);
      if (coordZ.current) coordZ.current.textContent = (y * 1.5).toFixed(2);
      if (vBar.current) vBar.current.style.transform = `scaleY(${progress})`;
      if (hBar.current) hBar.current.style.transform = `scaleX(${progress})`;
      if (pct.current) pct.current.textContent = `${Math.round(progress * 100)}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToChapter = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-6 pt-24 hidden lg:flex flex-col justify-between font-mono">
      {/* Top HUD Frame */}
      <div className="flex justify-between items-start">
        <motion.div
          key={activeChapter.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[10px] text-plasma/40 tracking-[0.4em] uppercase">Sector Alpha // Log</span>
          <span className="text-lg text-white font-orbitron tracking-tighter leading-none glow-text">
            {activeChapter.label}
          </span>
        </motion.div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-[9px] text-plasma/40 tracking-widest uppercase">Temporal Coordinates</div>
          <div className="flex flex-col items-end gap-1 text-[11px] text-plasma bg-void/80 p-3 border-r-2 border-plasma/50 font-mono">
            <div className="flex gap-4"><span className="opacity-40">X:</span> <span ref={coordX}>0.00</span> AU</div>
            <div className="flex gap-4"><span className="opacity-40">Y:</span> <span ref={coordY}>0.00</span> AU</div>
            <div className="flex gap-4"><span className="opacity-40">Z:</span> <span ref={coordZ}>0.00</span> LY</div>
          </div>
        </div>
      </div>

      {/* Side Status Bar */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
        <div className="h-48 w-1 bg-void border border-plasma/10 relative overflow-hidden">
          <div
            ref={vBar}
            className="absolute inset-0 bg-plasma shadow-[0_0_10px_#00d4ff] origin-bottom transition-transform duration-300 ease-out"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
        <span className="text-[8px] text-plasma/40 uppercase [writing-mode:vertical-lr] tracking-[0.5em]">System Vitality</span>
      </div>

      {/* Bottom HUD Frame */}
      <div className="flex flex-col items-center gap-6">
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
            <span ref={pct}>0%</span>
          </div>
          <div className="h-[2px] w-full bg-void border border-plasma/10 relative overflow-hidden">
            <div
              ref={hBar}
              className="absolute inset-0 bg-plasma origin-left transition-transform duration-500 ease-out"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUD;
