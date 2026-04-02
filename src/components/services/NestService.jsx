import React from 'react';
import ServiceItem from './ServiceItem';

export default function NestService({ item, index }) {
  // Specific logic or styling for NestJS can go here
  return <ServiceItem item={item} index={index} />;
}
