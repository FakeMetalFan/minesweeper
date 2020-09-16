import React from 'react';

import { CellFactory } from '../';
import './Field.scss';

export const Field = ({ columnsCount, state, cellRevealHandler, flagPlantingHandler, neighborsRevealHandler }) => (
  <div
    className='field'
    style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}
    onContextMenu={event => {event.preventDefault();}}
  >
    {state.map((cell, address) => <CellFactory
      key={address}
      state={cell}
      cellRevealHandler={() => {cellRevealHandler(cell, address);}}
      flagPlantingHandler={event => {
        event.preventDefault();

        flagPlantingHandler(cell, address);
      }}
      neighborsRevealHandler={({ target, nativeEvent }) => {
        const { which } = nativeEvent;

        const mouseupHandler = event => {
          which !== event.which && neighborsRevealHandler(address);

          target.removeEventListener('mouseup', mouseupHandler);
        };

        target.addEventListener('mouseup', mouseupHandler);
      }}
    />)}
  </div>
);
