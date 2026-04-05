import React from 'react';
import { motion } from 'framer-motion';
import SocialBtns from './SocialBtns';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function Contact({ data, socialData }) {
  const { sectionHeading, contactImg, contactInfo } = data;

  return (
    <section 
      id="contactus" 
      className="relative min-h-screen py-24 px-4 overflow-hidden bg-void flex flex-col items-center justify-center"
    >
      {/* Background Interference Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-plasma/40" />
            <span className="scifi-badge">CHAPTER 05</span>
            <div className="w-12 h-[1px] bg-plasma/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold tracking-tighter break-words px-4">
            {sectionHeading.title.replace('<span>', '').replace('</span>', '') || "Interstellar Transmission"}
          </h2>
          <div className="text-[10px] text-plasma/40 font-mono tracking-[0.5em] uppercase">
            Establishing Secure Link... Signal Strength: 98%
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Signal Coordinates & Info */}
          <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass-panel p-8 border-plasma/20 relative overflow-hidden"
             >
                {/* Scanner Head Animation */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-plasma/30 animate-scan-y pointer-events-none" />
                
                <h6 className="text-[10px] font-mono text-plasma/40 uppercase tracking-[0.3em] mb-6 border-b border-plasma/10 pb-2">
                  Signal Coordinates
                </h6>
                <div className="flex flex-col gap-6">
                   <ContactInfo contactInfoData={contactInfo} />
                   <div className="pt-6 border-t border-plasma/10">
                      <SocialBtns socialBtns={socialData} />
                   </div>
                </div>
             </motion.div>

             {/* Transmission Beacon Visual */}
             <div className="hidden lg:flex flex-col items-center justify-center p-8 glass-panel border-solar/10 bg-solar/5">
                <div className="w-16 h-16 rounded-full border border-solar/40 flex items-center justify-center animate-pulse">
                   <div className="w-4 h-4 bg-solar rounded-full shadow-[0_0_20px_#ff6b00]" />
                </div>
                <span className="text-[9px] font-mono text-solar/60 uppercase mt-4 tracking-widest">
                  Beacon Active
                </span>
             </div>
          </div>

          {/* Communication Console (Form) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass-panel p-8 md:p-12 border-plasma/30 shadow-[0_0_50px_rgba(0,212,255,0.05)]"
             >
                <div className="mb-10">
                   <h3 className="text-2xl font-orbitron text-white mb-2">{sectionHeading.subTitle}</h3>
                   <p className="text-sm font-rajdhani text-white/50 tracking-wide uppercase">
                     Data encryption active. All transmissions are routed through priority orbital relays.
                   </p>
                </div>
                <ContactForm />
             </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer Signal Accent */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-20">
         <div className="w-2 h-2 rounded-full bg-plasma animate-ping" />
         <span className="text-[8px] font-mono text-plasma uppercase tracking-[0.5em]">
           Continuous Pulse Signal Broadcasted
         </span>
      </div>
    </section>
  );
}
