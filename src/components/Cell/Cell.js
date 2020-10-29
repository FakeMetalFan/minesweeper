import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isBustedCell, isFlaggedCell, isHiddenCell, isMinedCell } from 'utils/check-cell';

import { cellValue } from 'const';

import './Cell.scss';

export const Cell = memo(({ cell, cellRevealHandler, flagPlantingHandler, neighborsRevealHandler }) => {
  const { value } = cell;

  const hasGuessedIncorrectly = value === cellValue.IncorrectGuess;
  const hasBustedMine = isBustedCell(cell);

  if (isHiddenCell(cell)) return <div
    className='cell'
    onClick={cellRevealHandler}
    onContextMenu={flagPlantingHandler}
  />;

  if (isFlaggedCell(cell)) return <div className='cell' onContextMenu={flagPlantingHandler}>
    <FontAwesomeIcon icon={['far', 'flag']} />
  </div>;

  if (value === cellValue.Empty) return <div className='cell cell__visible' />;

  if (isMinedCell(cell) || hasGuessedIncorrectly || hasBustedMine) return <div
    className={`cell ${hasGuessedIncorrectly ? 'cell__incorrect-guess' : hasBustedMine ? 'cell__busted-mine' : ''}`}
  >
    <FontAwesomeIcon icon={['fas', 'bomb']} />
  </div>;

  return <div className={`cell cell__visible cell__visible__${value}`} onMouseDown={neighborsRevealHandler}>
    {value}
  </div>;
});
