import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Cell.scss';

export const Cell = memo(({ state, cellRevealHandler, flagPlantingHandler, neighborsRevealHandler }) => {
  const { isHidden, hasFlag, isEmpty, hasMine, hasGuessedIncorrectly, hasBustedMine, value } = state;

  if (isHidden) return <div className='cell' onClick={cellRevealHandler} onContextMenu={flagPlantingHandler} />;

  if (hasFlag) return <div className='cell' onContextMenu={flagPlantingHandler}>
    <FontAwesomeIcon icon={['far', 'flag']} />
  </div>;

  if (isEmpty) return <div className='cell cell__visible' />;

  if (hasMine || hasGuessedIncorrectly || hasBustedMine) return <div
    className={`cell ${hasGuessedIncorrectly ? 'cell__incorrect-guess' : hasBustedMine ? 'cell__busted-mine' : ''}`}
  >
    <FontAwesomeIcon icon={['fas', 'bomb']} />
  </div>;

  return <div className={`cell cell__visible cell__visible__${value}`} onMouseDown={neighborsRevealHandler}>
    {value}
  </div>;
});
