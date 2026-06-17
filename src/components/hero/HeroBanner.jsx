import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner({ imgUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoDims, setVideoDims] = useState(null);
  const [baseSize, setBaseSize] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 400 : 256
  );
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = baseSize < 400;

  useEffect(() => {
    const update = () => setBaseSize(window.innerWidth >= 768 ? 400 : 256);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Mobile: play on scroll into view, reset on scroll away
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setVideoEnded(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Trigger play when scrolled into view on mobile
  useEffect(() => {
    if (!isMobile || !isInView || !videoRef.current) return;
    setVideoEnded(false);
    videoRef.current.currentTime = 0;
    // Try with sound first, fall back to muted if browser blocks it
    videoRef.current.play().catch(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => setVideoEnded(true));
      }
    });
  }, [isInView, isMobile]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDims({ w: videoRef.current.videoWidth, h: videoRef.current.videoHeight });
    }
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    setVideoEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const showVideo = isMobile ? (isInView && !videoEnded) : (isHovered && !videoEnded);

  // Compute expanded size matching video's natural aspect ratio
  const MAX_H = 580;
  let targetW = baseSize;
  let targetH = baseSize;
  if (videoDims) {
    const aspect = videoDims.w / videoDims.h;
    if (aspect < 1) {
      targetH = Math.min(videoDims.h, MAX_H);
      targetW = Math.round(targetH * aspect);
    } else {
      targetW = Math.round(baseSize * 1.4);
      targetH = Math.round(targetW / aspect);
    }
  }

  return (
    <div ref={containerRef} className="relative flex items-center justify-center min-h-[500px]">
      {/* Outer Pulse Ring */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.15, 0.05], rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[320px] h-[320px] md:w-[550px] md:h-[550px] border border-plasma/20 rounded-full"
      />

      {/* Middle Spinning Ring */}
      <motion.div
        animate={{ scale: [1, 1.02, 1], rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[260px] h-[260px] md:w-[480px] md:h-[480px] border border-dashed border-solar/20 rounded-full"
      />

      {/* Inner Core Portal */}
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={showVideo ? {
          width: targetW,
          height: targetH,
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0,212,255,0.8), 0 0 60px rgba(0,212,255,0.6), 0 0 120px rgba(0,212,255,0.4), 0 0 200px rgba(0,212,255,0.25), 0 0 300px rgba(0,212,255,0.1)',
        } : {
          width: baseSize,
          height: baseSize,
          borderRadius: '50%',
          scale: [0.98, 1.02, 0.98],
          boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.1)',
            '0 0 40px rgba(0, 212, 255, 0.2)',
            '0 0 20px rgba(0, 212, 255, 0.1)',
          ],
        }}
        transition={showVideo ? {
          width: { duration: 0.45, ease: 'easeOut' },
          height: { duration: 0.45, ease: 'easeOut' },
          borderRadius: { duration: 0.45, ease: 'easeOut' },
          boxShadow: { duration: 0.3 },
        } : {
          width: { duration: 0 },
          height: { duration: 0 },
          borderRadius: { duration: 0 },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative bg-gradient-to-tr from-void via-plasma/10 to-void
                   flex items-center justify-center overflow-hidden border border-plasma/30 cursor-crosshair"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,212,255,0.2)_0%,transparent_70%)] z-10 pointer-events-none" />

        {/* Video */}
        <video
          ref={videoRef}
          src="myapps/me.mp4"
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setVideoEnded(true)}
          className={`absolute inset-0 w-full h-full object-contain z-20 transition-opacity duration-500 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Image */}
        <AnimatePresence>
          {!showVideo && imgUrl && (
            <motion.img
              key="hero-image"
              src={imgUrl}
              alt="Hero Avatar"
              fetchPriority="high"
              loading="eager"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover object-top z-20 grayscale brightness-125 contrast-125"
            />
          )}
        </AnimatePresence>

        {!showVideo && !imgUrl && (
          <span className="text-plasma font-orbitron text-sm tracking-widest animate-pulse relative z-20">
            WARP CORE
          </span>
        )}
      </motion.div>
    </div>
  );
}
