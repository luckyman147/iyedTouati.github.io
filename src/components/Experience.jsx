import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ExperienceCard from './experience/ExperienceCard';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ data }) {
  const { sectionHeading, allExperience } = data;
  const sectionRef = useRef(null);

  // Scroll animations
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.experience-card');
    if (!cards || cards.length === 0) return;

    cards.forEach((card, index) => {
      // Scroll animation - fade in
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            markers: false
          },
          delay: index * 0.08
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      className="relative min-h-screen py-24 px-4 overflow-hidden  flex flex-col items-center"
      id="experience"
      ref={sectionRef}
    >
      {/* Background Star Map Frame */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b  pointer-events-none -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t  pointer-events-none -z-10" />
      
      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-plasma/40" />
            <span className="scifi-badge">{sectionHeading.miniTitle || "Chronicles"}</span>
            <div className="w-12 h-[1px] bg-plasma/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold tracking-tighter break-words">
            {sectionHeading.title.replace('<span>', '').replace('</span>', '') || "The Hero's Codex"}
          </h2>
          <div className="text-[10px] text-plasma/40 font-mono tracking-[0.5em] uppercase px-4 py-1 border border-plasma/10 rounded-full mt-4">
            Sequence: Temporal History // Log #4
          </div>
        </motion.div>

        <div className="flex flex-col relative">
          {allExperience?.map((item, index) => (
            <div key={index} className='experience-card'>
              <ExperienceCard
                item={item}
                index={index}
                total={allExperience.length}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Animated Codex Accents */}
      <div className="absolute top-1/3 left-4 md:left-20 w-[1px] h-64 bg-gradient-to-b from-transparent via-plasma/20 to-transparent -z-10" />
      <div className="absolute top-2/3 right-4 md:right-20 w-[1px] h-64 bg-gradient-to-b from-transparent via-plasma/20 to-transparent -z-10" />
    </section>
  );
}
