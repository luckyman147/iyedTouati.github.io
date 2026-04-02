import React from 'react';
import ServiceItem from './ServiceItem';

export default function SpringBootService({ item, index }) {
  // Specific logic or styling for Spring Boot / .NET can go here
  return <ServiceItem item={item} index={index} />;
}
