import React from 'react';
import { motion } from 'framer-motion';
import { revealProps } from './ui/Reveal';
import { Icon } from '@iconify/react';
import { useTilt } from '../hooks/useTilt';

// Reveal on the wrapper (framer owns its transform), tilt on the inner panel.
function CertCard({ index, children }) {
  const tiltRef = useTilt(6);
  return (
    <motion.div {...revealProps(Math.min(index * 0.1, 0.4))}>
      <div
        ref={tiltRef}
        className="glass-panel card-glow p-6 h-full border-plasma/10 hover:border-plasma/30 transition-colors duration-500 group"
      >
        {children}
      </div>
    </motion.div>
  );
}

const badgeColors = [
  'border-solar/40 text-solar',
  'border-plasma/40 text-plasma',
  'border-emerald-400/40 text-emerald-400',
  'border-violet-400/40 text-violet-400',
];

export default function Certifications({ data }) {
  if (!data || !data.length) return null;

  return (
    <section
      className="relative py-16 md:py-24 px-4 overflow-hidden flex flex-col items-center"
      id="certifications"
    >
      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          {...revealProps()}
          className="text-center mb-12 md:mb-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-solar/40" />
            <span className="scifi-badge">Validated</span>
            <div className="w-12 h-[1px] bg-solar/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold tracking-tighter">
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <CertCard key={index} index={index}>
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded border ${
                    badgeColors[index % badgeColors.length]
                  } flex items-center justify-center shrink-0`}
                >
                  <Icon
                    icon="lucide:award"
                    className="text-xl"
                  />
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <h4 className="text-lg font-orbitron font-bold text-white group-hover:text-plasma transition-colors tracking-tighter">
                    {item.title}
                  </h4>
                  <p className="text-sm font-mono text-white/50 tracking-wide">
                    {item.issuer}
                  </p>
                  {item.year && (
                    <span className="text-[10px] font-mono text-solar/80 uppercase tracking-[0.3em] mt-1">
                      {item.year}
                    </span>
                  )}
                </div>
              </div>
            </CertCard>
          ))}
        </div>
      </div>
    </section>
  );
}
