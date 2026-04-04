import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Icon } from '@iconify/react';

const DIRECTIVE_COLORS = ['#00d4ff', '#3b82f6', '#eab308', '#a855f7'];
const DIRECTIVE_ICONS = ['mdi:cog-outline', 'mdi:earth', 'mdi:diamond-outline', 'mdi:star-four-points-outline'];

export default function AboutContent({ miniTitle, title, subTitle, description, directives, funfacts, btnText, btnUrl, btnText2, btnUrl2 }) {
  return (
    <div className="relative w-full" style={{ background: 'rgba(0,0,10,0.97)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }} />

      <div className="relative z-10 p-8 md:p-14 flex flex-col gap-10">

        {/* BADGE */}
        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 w-fit">
          <span style={{ width: 24, height: 1, background: '#00d4ff', opacity: 0.5, display: 'inline-block' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.25em', color: '#00d4ff', fontFamily: 'Share Tech Mono, monospace', border: '1px solid rgba(0,212,255,0.3)', padding: '3px 10px' }}>
            {miniTitle || 'ORIGIN STORY'}
          </span>
          <span style={{ width: 24, height: 1, background: '#00d4ff', opacity: 0.5, display: 'inline-block' }} />
        </motion.div>

        {/* TITLE */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col gap-3">
          <h2
            className="font-orbitron font-black uppercase leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#ffffff', lineHeight: 1.1 }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subTitle && (
            <p style={{ color: '#ff6b00', fontFamily: 'Share Tech Mono, monospace', fontSize: 13, letterSpacing: '0.22em', fontWeight: 700 }}>
              {subTitle}
            </p>
          )}
        </motion.div>

        {/* TWO-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-orbitron leading-loose"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 20 }}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* RIGHT: Directives */}
          <div className="flex flex-col gap-3">
            {directives?.map((directive, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: `2px solid ${DIRECTIVE_COLORS[i % DIRECTIVE_COLORS.length]}`,
                  padding: '14px 18px',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <Icon
                  icon={DIRECTIVE_ICONS[i % DIRECTIVE_ICONS.length]}
                  style={{ fontSize: 20, color: DIRECTIVE_COLORS[i % DIRECTIVE_COLORS.length], opacity: 0.9, flexShrink: 0 }}
                />
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', fontFamily: 'Share Tech Mono, monospace', textTransform: 'uppercase' }}>
                    {directive.title}
                  </span>
                  <span className="font-orbitron font-bold" style={{ fontSize: 13, color: '#ffffff', letterSpacing: '0.05em' }}>
                    {directive.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FUN FACTS */}
        <div
          className="grid grid-cols-3 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}
        >
          {funfacts?.map((item, i) => {
            const numColor = i === 0 ? '#00d4ff' : i === 1 ? '#ff6b00' : '#00d4ff';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center justify-center text-center group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '20px 10px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${numColor}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <span
                  className="font-orbitron font-black"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: numColor, lineHeight: 1, filter: `drop-shadow(0 0 8px ${numColor}55)` }}
                >
                  {item.number}+
                </span>
                <span
                  className="mt-3"
                  style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', fontFamily: 'Share Tech Mono, monospace', textTransform: 'uppercase', whiteSpace: 'pre-line', lineHeight: 1.6 }}
                >
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <ScrollLink to={btnUrl} spy smooth offset={-80} duration={500}>
            <button
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 2,
                padding: '10px 22px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            >
              {btnText} →
            </button>
          </ScrollLink>

          {btnText2 && (
            <ScrollLink to={btnUrl2} spy smooth offset={-80} duration={500}>
              <button
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 2,
                  padding: '10px 22px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                {btnText2}
              </button>
            </ScrollLink>
          )}
        </motion.div>

      </div>
    </div>
  );
}
