import React from 'react';

import { Cell } from '../Cell/Cell';
import './Field.scss';

export const Field = ({ columnsCount, state, cellClickHandler }) => (
  <div className='field' style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}>
    {state.map((cellState, address) => <Cell
      key={address}
      state={cellState}
      clickHandler={() => {cellClickHandler(cellState, address);}}
    />)}
  </div>
);
