import React from 'react';

import './FieldCellFactory.scss';

export const FieldCellFactory = ({
  state,
  cellRevealHandler,
  flagPlantingHandler,
  neighborsRevealHandler,
}) => {
  if (state.isHidden) return (<button
    className='cell'
    onClick={cellRevealHandler}
    onContextMenu={flagPlantingHandler}
  />);

  if (state.isFlagged) return (<button className='cell cell__flag' onContextMenu={flagPlantingHandler} />);
  if (state.isEmpty) return (<button className='cell cell__visible' />);
  if (state.isMined) return (<button className='cell cell__mine' />);
  if (state.isIncorrectGuess) return (<button className='cell cell__incorrect-guess' />)
  if (state.isBustedMine) return (<button className='cell cell__busted-mine' />);

  return (<button className={`cell cell__visible cell__visible__${state.value}`} onMouseDown={neighborsRevealHandler}>
    {state.value}
  </button>);
};
