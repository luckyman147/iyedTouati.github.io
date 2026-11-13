import React from 'react';
import { motion } from 'framer-motion';
import { revealProps } from './ui/Reveal';

const nodeColors = [
  'border-plasma',
  'border-solar',
  'border-emerald-400',
  'border-violet-400',
];

export default function Education({ data }) {
  if (!data || !data.length) return null;

  return (
    <section
      className="relative py-16 md:py-24 px-4 overflow-hidden flex flex-col items-center"
      id="education"
    >
      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          {...revealProps()}
          className="text-center mb-12 md:mb-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-plasma/40" />
            <span className="scifi-badge">Formation</span>
            <div className="w-12 h-[1px] bg-plasma/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold tracking-tighter">
            Education
          </h2>
        </motion.div>

        <div className="flex flex-col relative">
          {data.map((item, index) => {
            const isLast = index === data.length - 1;
            return (
              <motion.div
                key={index}
                {...revealProps(Math.min(index * 0.1, 0.4))}
                className="relative pl-8 md:pl-12 pb-12 md:pb-16 last:pb-0 group"
              >
                {!isLast && (
                  <div className="absolute left-[7px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-plasma/40 to-transparent" />
                )}

                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: 'easeInOut',
                  }}
                  className={`absolute left-0 top-1 w-4 h-4 border-2 ${
                    nodeColors[index % nodeColors.length]
                  } bg-void rounded-full z-10`}
                />

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-solar tracking-[0.3em] uppercase">
                      {item.year}
                    </span>
                    <h4 className="text-xl md:text-2xl font-orbitron font-bold text-white group-hover:text-plasma transition-colors tracking-tighter">
                      {item.degree}
                    </h4>
                    <span className="text-xs md:text-sm font-mono text-plasma/60 italic tracking-wider md:tracking-widest break-words">
                      {`// @${item.institution.toUpperCase()}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
