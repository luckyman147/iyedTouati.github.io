import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import parser from 'html-react-parser';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial({ data }) {
  const { sectionHeading, allTestimonial } = data;
  const sectionRef = useRef(null);

  if (!allTestimonial || allTestimonial.length === 0) return null;

  // Scroll and hover animations
  useEffect(() => {
    const testimonials = sectionRef.current?.querySelectorAll('.testimonial-card');
    if (!testimonials || testimonials.length === 0) return;

    testimonials.forEach((testimonial, index) => {
      // Scroll animation - fade in + scale
      gsap.fromTo(
        testimonial,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonial,
            start: 'top 80%',
            end: 'top 50%',
            markers: false
          },
          delay: index * 0.1
        }
      );

      // Hover animations
      testimonial.addEventListener('mouseenter', () => {
        gsap.to(testimonial, {
          y: -5,
          boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      testimonial.addEventListener('mouseleave', () => {
        gsap.to(testimonial, {
          y: 0,
          boxShadow: '0 4px 12px rgba(0, 212, 255, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative min-h-[60vh] py-24 px-4 overflow-hidden" id="testimonials" ref={sectionRef}>
      {/* Background Interference Accent */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-plasma/5 to-transparent skew-x-12 -z-10" />
      
      <div className="container mx-auto max-w-4xl z-10">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle || "Allied Records"}
          title={sectionHeading.title || "Community Logs"}
          variant="text-center"
        />

        <div className="mt-16">
          {allTestimonial.map((item, index) => (
             <div
               key={index}
               className="testimonial-card glass-panel p-8 md:p-12 border-plasma/20 relative group overflow-visible"
             >
                {/* Quote Icon Accent */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-plasma/10 border border-plasma/30 rounded-full flex items-center justify-center text-plasma text-2xl font-serif">
                   "
                </div>

                <div className="flex flex-col gap-8">
                   {/* Community Note */}
                   {item.communityNote && (
                      <div className="text-[10px] font-mono text-plasma/60 tracking-[0.3em] uppercase border-b border-plasma/10 pb-4 mb-2">
                         {`// VERIFIED RECORD: ${parser(item.communityNote)}`}
                      </div>
                   )}

                   <p className="text-lg md:text-xl font-rajdhani italic text-white/80 leading-relaxed pl-4 border-l-2 border-plasma/10">
                      {item.reviewText}
                   </p>

                   <div className="flex items-center gap-4 mt-4">
                      <div className="w-16 h-16 rounded-full border border-plasma/30 overflow-hidden bg-void/60 grayscale group-hover:grayscale-0 transition-all duration-500">
                         <img src={item.avatarImg} alt={item.avatarName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                         <h6 className="text-base font-orbitron font-bold text-white group-hover:text-plasma transition-colors">
                            {item.avatarName}
                         </h6>
                         <span className="text-[10px] font-mono text-plasma/40 uppercase tracking-widest">
                            Signal Origin: {item.avatarCompany}
                         </span>
                      </div>
                   </div>
                </div>

                {/* Decorative scanning line */}
                <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-plasma/20 pointer-events-none group-hover:border-plasma/60 transition-all duration-500" />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
