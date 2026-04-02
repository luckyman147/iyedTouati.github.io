import React from 'react';
import parser from 'html-react-parser';

export default function ExperienceCard({ item, index, total }) {
  const isLast = index === total - 1;

  return (
    <div
      className={`ex-timeline-item ${isLast ? 'ex-timeline-item--last' : ''}`}
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay={index * 150}
    >
      <div className="ex-timeline-marker">
        <span className="ex-timeline-dot" />
        {!isLast && <span className="ex-timeline-line" />}
      </div>

      <div className="ex-card">
        <div className="ex-card__header">
          <div className="ex-card__meta">
            <span className="ex-card__duration">{item.duration}</span>
            <label className="ex-card__type">{item.jobType}</label>
          </div>
          <h4 className="ex-card__role">{item.designation}</h4>
          <span className="ex-card__company">{item.company}</span>
        </div>

        <div className="ex-card__body">
          <h5 className="ex-card__title">{item.companyTitle}</h5>
          <p className="ex-card__desc">{item.companyDescription}</p>
          {item.customDescription && (
            <p className="ex-card__desc ex-card__desc--custom">
              {parser(item.customDescription)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
