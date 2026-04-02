import React from 'react';
import HeroContent from './hero/HeroContent';
import HeroBanner from './hero/HeroBanner';

export default function Hero({ data, socialData }) {
  const { imgUrl, name, heading, typingText, description, btnText, btnUrl } = data;

  return (
    <section className="home-section" id="home" data-scroll-index={0}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
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
          <div className="col-lg-6">
            <HeroBanner imgUrl={imgUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
