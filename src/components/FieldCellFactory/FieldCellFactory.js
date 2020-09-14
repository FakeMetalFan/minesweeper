import React from 'react';

import './FieldCellFactory.scss';

export const FieldCellFactory = ({
  state,
  cellRevealHandler,
  flagPlantingHandler,
  handleNeighborsReveal,
}) => {
  if (state.isHidden) return (<div
    className='cell'
    onClick={cellRevealHandler}
    onContextMenu={flagPlantingHandler}
  />);

  if (state.isFlagged) return (<div
    className='cell cell__flag'
    onContextMenu={flagPlantingHandler}
  />);

  if (state.isEmpty) return (<div className='cell cell__visible' />);

  if (state.isMined) return (<div className='cell cell__mine' />);

  return (<div
    className={`cell cell__visible cell__visible__${state.value}`}
    onClick={handleNeighborsReveal}
  >
    {state.value}
  </div>);
};
