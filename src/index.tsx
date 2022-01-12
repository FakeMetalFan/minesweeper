import {
  StrictMode,
} from 'react';

import {
  render,
} from 'react-dom';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Minesweeper from 'containers/Minesweeper';

import setupIcons from 'setup-icons';

import GlobalStyles from 'styles';

setupIcons();

render(
  <StrictMode>
    <GlobalStyles />
    <Header />
    <main>
      <Minesweeper />
    </main>
    <Footer />
  </StrictMode>,
  document.getElementById('root')
);
