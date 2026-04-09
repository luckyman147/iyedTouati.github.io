import React from 'react';
import HeroContent from './hero/HeroContent';
import HeroBanner from './hero/HeroBanner';
import { motion } from 'framer-motion';

export default function Hero({ data, socialData }) {
  const { name, heading, typingText, description, btnText, btnUrl, imgUrl } = data;

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden" 
      id="home"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,transparent_60%)] -z-10" />
      
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1">
          <HeroContent
            name={name}
            heading={heading}
            typingText={typingText}
            description={description}
            btnText={btnText}
            btnUrl={btnUrl}
            socialData={socialData}
          />
        </div>
        
        <div className="flex-[1.4] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <HeroBanner imgUrl={imgUrl} />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-plasma/60 tracking-[0.4em] uppercase">Engage Warp</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-plasma/80 to-transparent" />
      </motion.div>
    </section>
  );
}
