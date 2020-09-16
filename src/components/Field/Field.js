import React from 'react';

import { FieldCellFactory } from '../';
import './Field.scss';

export const Field = ({
  columnsCount,
  state,
  cellRevealHandler,
  flagPlantingHandler,
  neighborsRevealHandler,
}) => (
  <div
    className='field'
    style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}
    onContextMenu={event => {
      event.preventDefault();
    }}
  >
    {state.map((cellState, address) => <FieldCellFactory
      key={address}
      state={cellState}
      cellRevealHandler={() => {
        cellRevealHandler(cellState, address);
      }}
      flagPlantingHandler={event => {
        event.preventDefault();

        flagPlantingHandler(cellState, address);
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
