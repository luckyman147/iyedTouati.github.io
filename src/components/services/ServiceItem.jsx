import { Icon } from '@iconify/react';
import React from 'react';

export default function ServiceItem({ item, index, colClass = 'col-lg-6' }) {
  return (
    <div className={colClass}>
      <div
        className="services-box"
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay={index * 100}
      >
        <div className="services-body">
          <div className="icon">
            <Icon icon={item.icon} />
          </div>
          <h5>{item.title}</h5>
          <p>{item.subTitle}</p>
        </div>
      </div>
    </div>
  );
}
