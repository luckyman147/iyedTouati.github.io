import React, { useRef, useEffect } from 'react';

const BackgroundFrames = () => {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none select-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="w-full h-full object-cover opacity-40 brightness-75 contrast-125"
      >
        <source src="/frames/Moving_Stars_Video_Generated.mp4" type="video/mp4" />
      </video>
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 b" />
      <div className="absolute inset-0" />
    </div>
  );
};

export default BackgroundFrames;
