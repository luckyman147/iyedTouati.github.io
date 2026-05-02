import React, { useRef, useEffect } from 'react';

const BackgroundFrames = () => {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none select-none bg-[#0a0a0a]">
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
};

export default BackgroundFrames;
