import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Layout from './components/Layout';
import Scene from './components/3d/Scene';
import VenusPlanet from './components/3d/VenusPlanet';
import HUD from './components/ui/HUD';
import CustomCursor from './components/CustomCursor';
import { useLenis } from './hooks/useLenis';
import { useGSAPRegistry } from './hooks/useGSAPRegistry';

import BackgroundFrames from './components/BackgroundFrames';

function App() {
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState("THE VOID");
  const location = useLocation();
  const lenis = useLenis();
  useGSAPRegistry();

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Refresh ScrollTriggers when location (route) changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location]);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll, limit, progress }) => {
      setProgress(progress);

      // Update chapter based on scroll position
      const chapters = ["THE VOID", "QUANTUM LAB", "MISSIONS", "THE CODEX", "SIGNAL"];
      const chapterIndex = Math.min(Math.floor(progress * chapters.length), chapters.length - 1);
      setCurrentChapter(chapters[chapterIndex]);
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  return (
    <>
      <CustomCursor />
      <HUD currentChapter={currentChapter} progress={progress} />
      <BackgroundFrames />
      <Scene />
      <VenusPlanet />
      
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
