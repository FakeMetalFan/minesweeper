import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Cell.scss';

export const Cell = memo(({ state, cellRevealHandler, flagPlantingHandler, neighborsRevealHandler }) => {
  const { isHidden, hasFlag, isEmpty, hasMine, hasGuessedIncorrectly, hasBustedMine, value } = state;

  if (isHidden) return <button className='cell' onClick={cellRevealHandler} onContextMenu={flagPlantingHandler} />;

  if (hasFlag) return <button className='cell' onContextMenu={flagPlantingHandler}>
    <FontAwesomeIcon icon={['far', 'flag']} />
  </button>;

  if (isEmpty) return <button className='cell cell__visible' />;

  if (hasMine || hasGuessedIncorrectly || hasBustedMine) return <button
    className={`cell ${hasGuessedIncorrectly ? 'cell__incorrect-guess' : hasBustedMine ? 'cell__busted-mine' : ''}`}
  >
    <FontAwesomeIcon icon={['fas', 'bomb']} />
  </button>;

  return <button className={`cell cell__visible cell__visible__${value}`} onMouseDown={neighborsRevealHandler}>
    {value}
  </button>;
});
