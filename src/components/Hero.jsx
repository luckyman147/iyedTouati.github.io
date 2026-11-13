import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroContent from './hero/HeroContent';
import HeroBanner from './hero/HeroBanner';
import { createHeroTimeline } from '../animations/heroTimeline';

export default function Hero({ data, socialData }) {
  const heroRef = useRef(null);
  const { name, heading, typingText, description, btnText, btnUrl, imgUrl } = data;

  // GSAP owns the hero entrance. useLayoutEffect sets the "from" state before
  // first paint, so there is no flash of un-animated content.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      createHeroTimeline(heroRef.current);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero relative min-h-[100svh] flex flex-col items-center justify-center pt-20 pb-10 md:pb-0 overflow-hidden"
      id="home"
      ref={heroRef}
    >
      {/* Background Glow */}
      <div className="hero-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,transparent_60%)] -z-10" />

      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center gap-4 md:gap-12 text-center md:text-left">
        <div className="flex-1 order-2 md:order-1">
          <HeroContent
            name={name}
            heading={heading}
            typingText={typingText}
            description={description}
            btnText={btnText}
            btnUrl={btnUrl}
            socialData={socialData}
          />
        </div>

        <div className="hero-banner flex-[1.4] flex items-center justify-center order-1 md:order-2">
          <HeroBanner imgUrl={imgUrl} />
        </div>
      </div>

      {/* Scroll Indicator (CSS float animation, transform only) */}
      <div className="hero-scroll hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] text-plasma/60 tracking-[0.4em] uppercase">Engage Warp</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-plasma/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
