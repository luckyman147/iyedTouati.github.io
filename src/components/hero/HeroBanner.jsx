import React from 'react';

export default function HeroBanner({ imgUrl }) {
  return (
    <div className="hs-banner">
      <img src={imgUrl} alt="Admin" />
    </div>
  );
}
