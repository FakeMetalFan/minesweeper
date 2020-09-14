import React from 'react';

import { FieldCellFactory } from '../';
import './Field.scss';

export const Field = ({
  columnsCount,
  state,
  cellRevealHandler,
  flagPlantingHandler,
  handleNeighborsReveal,
}) => (
  <div className='field' style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}>
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
      handleNeighborsReveal={() => {
        handleNeighborsReveal(cellState, address);
      }}
    />)}
  </div>
);
