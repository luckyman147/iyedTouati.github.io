import React from 'react';
import parser from 'html-react-parser';

export default function Modal({ modalData }) {
  const { thumbUrl, videoUrl, details } = modalData;
  const { title, description, type, frameworks, platform, url } =
    details;
  return (
    <div className="px-modal">
      <div className="single-project-box">
        <div className="row align-items-start">
          <div className="col-lg-7">
            {videoUrl ? (
              <video
                className="border w-100 rounded-3 shadow-lg"
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{ maxHeight: '500px', objectFit: 'contain', background: '#080808' }}
              />
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
