import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';

export const Header = () => (
  <header>
    <span className='title'>Minesweeper</span>

    <a href='https://github.com/FakeMetalFan/minesweeper' target='_blank' rel='noopener noreferrer'>
      <FontAwesomeIcon icon={['fab', 'github']} />
    </a>
  </header>
);
