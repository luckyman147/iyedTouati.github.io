import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Icon } from '@iconify/react';

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-plasma opacity-0 group-hover:opacity-50 group-hover:animate-glitch translate-x-1">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-20 text-solar opacity-0 group-hover:opacity-50 group-hover:animate-glitch -translate-x-1">
        {text}
      </span>
    </div>
  );
};

export default function HeroContent({ name, heading, typingText, description, btnText, btnUrl }) {
  const [dynamicDescription, setDynamicDescription] = React.useState(description);
  const [roleBadge, setRoleBadge] = React.useState('Transmission Received');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role')?.toLowerCase();
    
    if (role) {
       let roleName = "Software Engineer";
       if (role === 'frontend') roleName = "Senior Frontend Engineer";
       else if (role === 'mobile') roleName = "Mobile App Architect";
       else if (role === 'backend') roleName = "Backend Solutions Engineer";
       else if (role === 'fullstack') roleName = "Full-Stack Architect";
       else if (role === 'ai') roleName = "AI Specialist";
       
       setDynamicDescription(description.replace("Software Engineer", roleName));
       setRoleBadge(`[ TARGET PROFILE: ${roleName.toUpperCase()} ]`);
    } else {
       setDynamicDescription(description);
       setRoleBadge('Transmission Received');
    }
  }, [description]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="scifi-badge mb-4 text-plasma border-plasma/50 bg-plasma/10 px-3 py-1 text-xs">{roleBadge}</span>
        <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-orbitron font-bold tracking-tighter leading-tight break-words mt-4">
          <GlitchText text={name} />
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-4 text-plasma/80 font-mono text-sm md:text-lg">
          <span className="w-12 h-[1px] bg-plasma/30" />
          <span className="uppercase tracking-[0.3em]">{heading}</span>
        </div>
        
        <p
          className="hero-subtitle text-lg md:text-xl text-white/70 font-rajdhani leading-relaxed max-w-xl border-l-2 border-plasma/20 pl-6 py-2"
          dangerouslySetInnerHTML={{ __html: dynamicDescription }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap gap-6 mt-4"
      >
        {btnText && btnUrl && (
          <ScrollLink
            to={btnUrl}
            smooth={true}
            duration={500}
            className="hero-cta px-8 py-3 bg-plasma/20 border border-plasma/50 text-plasma hover:bg-plasma/30 transition-all duration-300 cursor-pointer rounded font-rajdhani font-semibold uppercase tracking-wider text-sm"
          >
            {btnText}
          </ScrollLink>
        )}
      </motion.div>
    </div>
  );
}
