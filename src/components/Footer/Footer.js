import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.scss';

export const Footer = () => (
  <footer>
    <span>
      Powered by
      <a href='https://github.com/FakeMetalFan' target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={['fab', 'github']} />
      </a>
      &copy;<span>{new Date().getFullYear()}</span>
    </span>
  </footer>
);
