import React from 'react';

import './FieldCellFactory.scss';

export const FieldCellFactory = ({
  state,
  cellRevealHandler,
  flagPlantingHandler,
  handleNeighborsReveal,
}) => {
  if (state.isHidden) return (<button
    className='cell'
    onClick={cellRevealHandler}
    onContextMenu={flagPlantingHandler}
  />);

  if (state.isFlagged) return (<button
    className='cell cell__flag'
    onContextMenu={flagPlantingHandler}
  />);

  if (state.isEmpty) return (<button className='cell cell__visible' />);

  if (state.isMined) return (<button className='cell cell__mine' />);

  if (state.isIncorrectGuess) return (<button className='cell cell__incorrect-guess' />)

  return (<button
    className={`cell cell__visible cell__visible__${state.value}`}
    onClick={handleNeighborsReveal}
  >
    {state.value}
  </button>);
};
