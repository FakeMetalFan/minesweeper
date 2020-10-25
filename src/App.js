import React from 'react';

import { Header, Minesweeper, Footer } from 'components';

export const App = () => <>
  <Header />
  <Minesweeper minesCount={30} fieldDimension={16} />
  <Footer />
</>;
