import React from 'react';
import parser from 'html-react-parser';
import { motion } from 'framer-motion';

export default function SectionHeading({ miniTitle, title, variant }) {
  const isCenter = variant === 'text-center';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} gap-4`}
    >
      <div className="flex items-center gap-4">
        {!isCenter && <div className="w-8 h-[1px] bg-plasma/40" />}
        <span className="scifi-badge">{miniTitle}</span>
        {isCenter && <div className="w-8 h-[1px] bg-plasma/40" />}
      </div>
      
      <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-tighter text-white">
        {parser(title)}
      </h2>
      
      <div className="h-[2px] w-12 bg-plasma/20 mt-2" />
    </motion.div>
  );
}
