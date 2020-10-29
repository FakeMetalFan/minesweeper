import React from 'react';

import { Cell } from '..';

import './Field.scss';

export const Field = ({ width, disabled, field, cellRevealHandler, flagPlantingHandler, neighborsRevealHandler }) => {
  const handleNeighborsReveal = ({ target, nativeEvent: { which } }, address) => {
    if (!disabled) {
      const handleMouseup = event => {
        which !== event.which && neighborsRevealHandler(address);

        target.removeEventListener('mouseup', handleMouseup);
      };

      target.addEventListener('mouseup', handleMouseup);
    }
  };

  return <div
    className={`field${disabled ? ' disabled' : ''}`}
    style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}
    onContextMenu={event => { event.preventDefault(); }}
  >
    {field.map((cell, address) => <Cell
      key={address}
      cell={cell}
      cellRevealHandler={() => { !disabled && cellRevealHandler(cell, address); }}
      flagPlantingHandler={() => { !disabled && flagPlantingHandler(cell, address); }}
      neighborsRevealHandler={event => { handleNeighborsReveal(event, address); }}
    />)}
  </div>;
};
