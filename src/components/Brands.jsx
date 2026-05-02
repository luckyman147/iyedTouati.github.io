import React, { useMemo } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

export default function Brands({ data }) {
  const dynamicBrands = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const role = params.get('role')?.toLowerCase();
      
      if (!role) return data;
      
      return [...data].sort((a, b) => {
        const aAlt = a.alt.toLowerCase();
        const bAlt = b.alt.toLowerCase();
        
        const roleKeywords = {
          frontend: ['react', 'figma', 'angular'],
          mobile: ['flutter', 'react native', 'react'],
          backend: ['.net', 'backend', 'node', 'fastapi'],
          ai: ['python', 'ai', 'fastapi']
        };
        
        const keywords = roleKeywords[role] || [];
        const aMatch = keywords.some(k => aAlt.includes(k)) ? 1 : 0;
        const bMatch = keywords.some(k => bAlt.includes(k)) ? 1 : 0;
        
        return bMatch - aMatch;
      });
    } catch (e) {
      return data;
    }
  }, [data]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-12 bg-void/80 border-y border-plasma/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mb-8 flex items-center gap-4 justify-center"
        >
           <div className="w-12 h-[1px] bg-plasma/20" />
           <span className="text-[10px] font-mono text-plasma/40 uppercase tracking-[0.5em]">
             Strategic Alliances // Established
           </span>
           <div className="w-12 h-[1px] bg-plasma/20" />
        </motion.div>

        <div className="px-4">
          <Slider {...settings}>
            {dynamicBrands.map((item, index) => (
              <div key={index} className="px-4 outline-none">
                <div className="flex items-center justify-center h-20 group transition-all duration-500 hover:scale-110">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="max-h-full max-w-full object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 brightness-0 invert" 
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      {/* Background Microglitch Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-plasma/20 to-transparent" />
    </section>
  );
}
