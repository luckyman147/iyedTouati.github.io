import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialBtns({ variant, socialBtns }) {
  return (
    <div
      className={`flex flex-wrap gap-4 items-center ${variant ? variant : ''}`}
      data-aos="zoom-in"
      data-aos-duration="1200"
      data-aos-delay="300"
    >
      {socialBtns?.map((item, index) => (
        <Link
          className={`flex items-center justify-center w-12 h-12 rounded-lg border border-plasma/30 bg-plasma/5 text-white/50 hover:text-plasma hover:border-plasma hover:bg-plasma/20 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-300 ${item.iconBgClass || ''}`}
          to={item.href}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={item.icon} className="text-2xl" />
        </Link>
      ))}
    </div>
  );
}
