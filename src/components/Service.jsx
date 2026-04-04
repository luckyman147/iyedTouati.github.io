import React from 'react';
import { motion } from 'framer-motion';
import ServiceItem from './services/ServiceItem';

export default function Service({ data }) {
  const { sectionHeading, allService } = data;

  return (
    <section 
      className="relative min-h-screen py-24 px-4 overflow-hidden flex flex-col items-center justify-center" 
      id="services"
    >
      {/* Background Quantum Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] -z-10" />
      
      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-plasma/40" />
            <span className="scifi-badge">{sectionHeading.miniTitle || "Experimental Lab"}</span>
            <div className="w-12 h-[1px] bg-plasma/40" />
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold tracking-tighter">
            {sectionHeading.title.replace('<span>', '').replace('</span>', '') || "The Quantum Core"}
          </h2>
          <div className="text-[10px] text-plasma/40 font-mono tracking-[0.5em] uppercase">
            Analyzing Proficiency Levels...
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allService?.map((item, index) => (
            <ServiceItem 
              key={index} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Background Lab Accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-plasma/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-solar/5 blur-[100px] rounded-full -z-10" />
    </section>
  );
}
