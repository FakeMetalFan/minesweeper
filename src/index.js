import React  from 'react';
import { render } from 'react-dom';

import { App } from 'App';

import { setupIcons } from 'setupIcons';

import './index.scss';

setupIcons();

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
