import { Icon } from '@iconify/react';
import React from 'react';
import parser from 'html-react-parser';
import { Link as ScrollLink } from 'react-scroll';

export default function AboutContent({ miniTitle, title, description, funfacts, btnText, btnUrl }) {
  return (
    <div className="about-text text-center mx-auto" style={{ maxWidth: '800px' }} data-aos="fade" data-aos-duration="1200" data-aos-delay="400">
      <div className="section-heading">
        {miniTitle && (
          <h6>
            <span>{miniTitle}</span>
          </h6>
        )}
        {title && <h2>{parser(title)}</h2>}
      </div>
      <h4 className="description-text">{description}</h4>
      <div className="review-box justify-content-center">
        {funfacts?.map((item, index) => (
          <div className="r-box" key={index}>
            <h3>
              {item.number}
              <span>+</span>
            </h3>
            <label>{item.title}</label>
          </div>
        ))}
      </div>
      <div className="btn-bar">
        <ScrollLink to={btnUrl} spy={true} smooth={true} offset={-80} duration={300} className="px-btn">
          <span>{btnText}</span>{' '}
          <i>
            <Icon icon="bi:arrow-right" />
          </i>
        </ScrollLink>
      </div>
    </div>
  );
}
