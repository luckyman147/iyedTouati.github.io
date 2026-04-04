import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const NavLink = ({ to, label, onClick }) => (
  <ScrollLink
    to={to}
    spy={true}
    smooth={true}
    offset={-80}
    duration={800}
    onClick={onClick}
    className="text-xs font-mono tracking-[0.3em] text-white/50 hover:text-plasma transition-all cursor-crosshair uppercase"
  >
    {label}
  </ScrollLink>
);

export default function Header() {
  const [mobileToggle, setMobileToggle] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Minimal Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-crosshair"
        >
          <img 
            src="/dd.ico" 
            alt="Iyed Touati Logo" 
            className="w-17² h-12 object-contain group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#00d4ff] transition-all duration-500" 
          />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 bg-void/20 backdrop-blur-md px-8 py-3 border border-white/5 rounded-full">
           <NavLink to="home" label="Core" />
           <NavLink to="about" label="Data" />
           <NavLink to="services" label="Lab" />
           <NavLink to="project" label="Missions" />
           <NavLink to="experience" label="Codex" />
           <NavLink to="contactus" label="Signal" />
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-10 h-10 border border-plasma/20 flex flex-col items-center justify-center gap-1.5 bg-void/40"
          onClick={() => setMobileToggle(!mobileToggle)}
        >
          <div className={`w-5 h-[1px] bg-plasma transition-all ${mobileToggle ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <div className={`w-5 h-[1px] bg-plasma transition-all ${mobileToggle ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileToggle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-void/95 backdrop-blur-2xl border-b border-plasma/20 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-8 py-12">
               <NavLink to="home" label="Core" onClick={() => setMobileToggle(false)} />
               <NavLink to="about" label="Data" onClick={() => setMobileToggle(false)} />
               <NavLink to="services" label="Lab" onClick={() => setMobileToggle(false)} />
               <NavLink to="project" label="Missions" onClick={() => setMobileToggle(false)} />
               <NavLink to="experience" label="Codex" onClick={() => setMobileToggle(false)} />
               <NavLink to="contactus" label="Signal" onClick={() => setMobileToggle(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
