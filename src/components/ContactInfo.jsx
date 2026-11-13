import React from 'react';

export default function ContactInfo({ contactInfoData }) {
  return (
    <div className="contact-info">
      {contactInfoData.map((item, index) => (
        <div
          className="contact-info-in"
          key={index}
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay={index * 100}
        >
          <label>{item.title}</label>
          {item.email && <a className="inline-block py-2 break-all" href={`mailto:${item.email}`}>{item.email}</a>}
          {item.tel && <a className="inline-block py-2" href={`tel:${item.tel}`}>{item.tel}</a>}
        </div>
      ))}
    </div>
  );
}
