import React from 'react';
import SectionHeading from './SectionHeading';
import parser from 'html-react-parser';

export default function Testimonial({ data }) {
  const { sectionHeading, allTestimonial } = data;
  return (
    <section className="section effect-section pb-0">
      <div className="effect-3">
        <img src="/images/effect-3.svg" title alt="" />
      </div>
      <div className="effect-4">
        <img src="/images/effect-4.svg" title alt="" />
      </div>
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
          variant="text-center"
        />
        <div data-aos="fade" data-aos-duration="1200" data-aos-delay="300">
          {allTestimonial?.length > 0 && (
            <div className="testimonial-box text-center">
              {allTestimonial[0].communityNote && (
                <div className="community-note-h2">
                  {parser(allTestimonial[0].communityNote)}
                </div>
              )}
              <div className="t-user">
                <img src={allTestimonial[0].avatarImg} alt="Avatar" />
              </div>
              <div className="t-text">{allTestimonial[0].reviewText}</div>
              <div className="t-person">
                <h6>{allTestimonial[0].avatarName}</h6>
                <span>{allTestimonial[0].avatarCompany}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
