import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Layout from './components/Layout';
import HUD from './components/ui/HUD';
import ScrollProgress from './components/ui/ScrollProgress';
import { useLenis } from './hooks/useLenis';

const BackgroundFrames = lazy(() => import('./components/BackgroundFrames'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  useLenis();

  // Refresh ScrollTriggers when location (route) changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location]);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <HUD />
      <Suspense fallback={null}>
        <BackgroundFrames />
      </Suspense>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </MotionConfig>
  );
}

export default App;
