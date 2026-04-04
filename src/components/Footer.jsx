import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-void border-t border-plasma/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-plasma/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-plasma animate-pulse" />
           <p className="text-[10px] font-mono text-plasma/40 uppercase tracking-[0.3em]">
             System Status: Online // Temporal Core Sync: OK
           </p>
        </div>

        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] text-center">
          © {currentYear} // Mohamed Iyed Touati // Architecting Worlds
        </p>

        <div className="text-[10px] font-mono text-plasma/40 uppercase tracking-[0.3em]">
          Ref: 0x-ALPHA-7G
        </div>
      </div>
    </footer>
  );
}
