import React from 'react';
import AboutContent from './about/AboutContent';
import { motion } from 'framer-motion';

export default function About({ data }) {
  const { miniTitle, title, subTitle, description, directives, funfacts, btnText, btnUrl, btnText2, btnUrl2 } = data;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden" 
      id="about"
    >
      {/* Background Nebula Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(0,212,255,0.05)_0%,transparent_50%)] -z-10" />
      
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
        >
          <AboutContent
            miniTitle={miniTitle}
            title={title}
            subTitle={subTitle}
            description={description}
            directives={directives}
            funfacts={funfacts}
            btnText={btnText}
            btnUrl={btnUrl}
            btnText2={btnText2}
            btnUrl2={btnUrl2}
          />
        </motion.div>
      </div>
      
      {/* Cinematic Star Frame */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-plasma/20 m-8" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-plasma/20 m-8" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-plasma/20 m-8" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-plasma/20 m-8" />
      </div>
    </section>
  );
}
