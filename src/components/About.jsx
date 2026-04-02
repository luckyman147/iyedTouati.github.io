import React from 'react';
import AboutContent from './about/AboutContent';

export default function About({ data }) {
  const { miniTitle, title, description, funfacts, btnText, btnUrl } = data;

  return (
    <section className="about-section section" id="about">
      <div className="container">
        {/* Effects */}
        <div className="effect-1">
          <img
            src="/images/effect-1.svg"
            alt="Shape"
            data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="500"
          />
        </div>
        <div className="effect-2">
          <img
            src="/images/effect-2.svg"
            alt="Shape"
            data-aos="zoom-in" data-aos-duration="1200" data-aos-delay="400"
          />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <AboutContent
              miniTitle={miniTitle}
              title={title}
              description={description}
              funfacts={funfacts}
              btnText={btnText}
              btnUrl={btnUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
