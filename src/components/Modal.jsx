import React, { useState } from 'react';
import parser from 'html-react-parser';

export default function Modal({ modalData }) {
  const { thumbUrl, videoUrl, details } = modalData;
  const { title, description, type, frameworks, platform, url } =
    details;
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="px-modal">
      <div className="single-project-box">
        <div className="row align-items-start">
          <div className="col-lg-7">
            {videoUrl ? (
              <div className="relative">
                {!videoLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#080808] rounded-3" style={{ height: '500px' }}>
                    <div className="flex flex-col items-center gap-3">
                      <svg className="animate-spin h-8 w-8 text-plasma" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-xs font-mono text-plasma/60 uppercase tracking-widest animate-pulse">Loading</span>
                    </div>
                  </div>
                )}
                <video
                  className={`border w-100 rounded-3 shadow-lg ${videoLoaded ? '' : 'opacity-0 absolute'}`}
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onCanPlay={() => setVideoLoaded(true)}
                  style={{ maxHeight: '500px', objectFit: 'contain', background: '#080808' }}
                />
              </div>
            ) : (
              <img className="border" src={thumbUrl} alt="Thumbnail" />
            )}
          </div>
          <div className="col-lg-5 pt-4 pt-lg-0">
            {title && <h4>{parser(title)}</h4>}
            {description && <p>{parser(description)}</p>}
            <div className="about-content">
              <ul>
                {type && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3 text-white">Type:</span>
                    <span>{type}</span>
                  </li>
                )}
                {frameworks && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3 text-white">Frameworks:</span>
                    <span>{frameworks}</span>
                  </li>
                )}
                {platform && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3 text-white">Platform:</span>
                    <span>{platform}</span>
                  </li>
                )}
                {url && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3 text-white">Live URL:</span>
                    <span>{url}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
