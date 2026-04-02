import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Logo from './header/Logo';
import NavMenu from './header/NavMenu';
import { useHeaderScroll } from '../hooks/useHeaderScroll';

export default function Header() {
  const [mobileToggle, setMobileToggle] = useState(false);
  const scrolled = useHeaderScroll();

  const headerClass = `header-top-fixed one-page-nav ${
    mobileToggle ? 'menu-open menu-open-desk' : ''
  } ${scrolled ? 'fixed-header' : ''}`;

  const handleToggle = () => setMobileToggle(!mobileToggle);

  return (
    <div className={headerClass}>
      <div className="container">
        <Logo />
        <NavMenu setMobileToggle={setMobileToggle} />
        <div className="d-flex">
          <ScrollLink
            to="contactus"
            spy={true} smooth={true} offset={-80} duration={500}
            onClick={() => setMobileToggle(false)}
            className="px-btn d-none d-lg-inline-flex"
          >
            Lets' Talk
          </ScrollLink>
          <button className="toggler-menu d-lg-none" onClick={handleToggle}>
            <span />
          </button>
        </div>
      </div>
    </div>
  );
}
