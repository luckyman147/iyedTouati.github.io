import React from 'react';
import SectionHeading from './SectionHeading';
import ServiceItem from './services/ServiceItem';
import NestService from './services/NestService';
import SpringBootService from './services/SpringBootService';
import ReactNativeService from './services/ReactNativeService';

const serviceComponents = {
  'NestJS & Node.js': NestService,
  'Spring Boot / Java': SpringBootService,
  '.NET Core / C#': SpringBootService,
  'React Development': ReactNativeService,
  'ReactNativeService': ReactNativeService,
};

export default function Service({ data }) {
  const { sectionHeading, allService } = data;
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-5">
          {allService?.map((item, index) => {
            const ServiceComponent = serviceComponents[item.title] || ServiceItem;
            return (
              <ServiceComponent 
                key={index} 
                item={item} 
                index={index} 
                colClass="col-sm-12 col-lg-6"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
