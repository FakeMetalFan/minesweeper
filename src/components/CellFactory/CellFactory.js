import React from 'react';

import './CellFactory.scss';

export const CellFactory = ({ state, cellRevealHandler, flagPlantingHandler, neighborsRevealHandler }) => {
  const { isHidden, isFlagged, isEmpty, isMined, isIncorrectGuess, isBustedMine, value } = state;

  if (isHidden) return (<button className='cell' onClick={cellRevealHandler} onContextMenu={flagPlantingHandler} />);
  if (isFlagged) return (<button className='cell cell__flag' onContextMenu={flagPlantingHandler} />);
  if (isEmpty) return (<button className='cell cell__visible' />);
  if (isMined) return (<button className='cell cell__mine' />);
  if (isIncorrectGuess) return (<button className='cell cell__incorrect-guess' />)
  if (isBustedMine) return (<button className='cell cell__busted-mine' />);

  return (<button className={`cell cell__visible cell__visible__${value}`} onMouseDown={neighborsRevealHandler}>
    {value}
  </button>);
};
