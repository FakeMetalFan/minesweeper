import React from 'react';

import './Field.scss';

import { Cell } from '../Cell/Cell';

export const Field = ({ state, cellClickHandler }) => (
  <table>
    <tbody>
      {state.map((row, rowAddress) =>
        <tr key={rowAddress}>
          {row.map((cell, cellAddress) =>
            <Cell
              key={rowAddress + cellAddress}
              clickHandler={() => { cellClickHandler(cell, rowAddress, cellAddress); }}
              state={cell}
            />
          )}
        </tr>
      )}
    </tbody>
  </table>
);
