import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const navLinks = [
  { to: 'home', label: 'Home' },

  { to: 'project', label: 'Projects' },
  { to: 'services', label: 'Services' },
  { to: 'contactus', label: 'Contact' },
];

export default function NavMenu({ setMobileToggle }) {
  const handleLinkClick = () => setMobileToggle(false);

  return (
    <ul className="main-menu">
      {navLinks.map(({ to, label }) => (
        <li key={to}>
          <ScrollLink
            to={to}
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            onClick={handleLinkClick}
          >
            {label}
          </ScrollLink>
        </li>
      ))}
    </ul>
  );
}
