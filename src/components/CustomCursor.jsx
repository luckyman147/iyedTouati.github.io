import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update custom cursor elements using refs for performance
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.cursor-crosshair') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <div 
        ref={cursorRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        {/* Main Crosshair Dot */}
        <div className={`w-1 h-1 bg-white rounded-full transition-all duration-300 ${isHovering ? 'scale-[3] bg-plasma' : ''}`} />
        
        {/* Glowing Crosshair Rings */}
        <motion.div 
           animate={{ 
             rotate: isHovering ? 90 : 0, 
             scale: isHovering ? 1.5 : 1,
             borderColor: isHovering ? '#00d4ff' : 'rgba(0, 212, 255, 0.4)'
           }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-plasma/40 rounded-full"
        />
        
        {/* Crosshair Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-plasma/40 transition-all ${isHovering ? 'h-4 bg-plasma' : ''}`} />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-plasma/40 transition-all ${isHovering ? 'h-4 bg-plasma' : ''}`} />
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-plasma/40 transition-all ${isHovering ? 'w-4 bg-plasma' : ''}`} />
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-plasma/40 transition-all ${isHovering ? 'w-4 bg-plasma' : ''}`} />
        </div>

        {/* Trail Effect (Subtle delayed glow) */}
        <motion.div 
           animate={{ x: 0, y: 0 }}
           transition={{ type: "spring", stiffness: 50, damping: 20 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-plasma/10 blur-xl rounded-full"
        />
      </div>
    </div>
  );
};

export default CustomCursor;
