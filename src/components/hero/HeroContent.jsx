import React from 'react';
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
    <div className="flex flex-col gap-4 md:gap-6 max-w-2xl px-2 sm:px-4 md:px-0 items-center md:items-start">
      <div>
        <span className="hero-badge scifi-badge mb-3 md:mb-4 text-plasma border-plasma/50 bg-plasma/10 px-3 py-1 text-[10px] sm:text-xs">{roleBadge}</span>
        <h1 className="hero-title text-[2.1rem] leading-[1.1] sm:text-5xl md:text-7xl md:leading-tight font-orbitron font-bold tracking-tighter break-words mt-3 md:mt-4">
          <GlitchText text={name} />
        </h1>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
        <div className="hero-heading flex items-center gap-3 md:gap-4 text-plasma/80 font-mono text-sm md:text-lg">
          <span className="w-8 md:w-12 h-[1px] bg-plasma/30" />
          <span className="uppercase tracking-[0.2em] md:tracking-[0.3em]">{heading}</span>
          <span className="w-8 h-[1px] bg-plasma/30 md:hidden" />
        </div>

        <p
          className="hero-subtitle text-base sm:text-lg md:text-xl text-white/70 font-rajdhani leading-relaxed max-w-xl md:border-l-2 md:border-plasma/20 md:pl-6 py-1 md:py-2"
          dangerouslySetInnerHTML={{ __html: dynamicDescription }}
        />
      </div>

      <div className="flex flex-wrap gap-6 mt-2 md:mt-4 w-full sm:w-auto justify-center md:justify-start">
        {btnText && btnUrl && (
          <a
            href={btnUrl}
            download
            className="hero-cta cta-glow btn-shine w-full sm:w-auto text-center px-8 py-3.5 md:py-3 bg-plasma/20 border border-plasma/50 text-plasma hover:bg-plasma/30 transition-all duration-300 cursor-pointer rounded font-rajdhani font-semibold uppercase tracking-wider text-sm inline-block"
          >
            {btnText}
          </a>
        )}
      </div>
    </div>
  );
}
