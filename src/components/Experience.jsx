import React from 'react';
import SectionHeading from './SectionHeading';
import ExperienceCard from './experience/ExperienceCard';

export default function Experience({ data }) {
  const { sectionHeading, allExperience } = data;

  return (
    <section className="section gray-bg" id="experience">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="ex-timeline">
          {allExperience?.map((item, index) => (
            <ExperienceCard
              key={index}
              item={item}
              index={index}
              total={allExperience.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
