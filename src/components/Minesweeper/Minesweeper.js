import React, { useState } from 'react';

import reject from 'lodash/reject';

import { useField, useDidUpdate } from 'hooks';

import { isBustedCell, isFlaggedCell, isHiddenCell, isMinedCell } from 'utils/check-cell';

import { Field, Indicators } from '..';

import './Minesweeper.scss';

export const Minesweeper = ({ minesCount, fieldDimension }) => {
  const [isInit, setIsInit] = useState(false);
  const [isBust, setIsBust] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [hiddenMinesCount, setHiddenMinesCount] = useState(minesCount);

  const {
    field,
    reset,
    init,
    revealCell,
    plantFlag,
    revealNeighbors,
    markMines,
  } = useField({ minesCount, width: fieldDimension, height: fieldDimension });

  const handleCellReveal = (cell, address) => {
    if (isInit) revealCell(cell, address);
    else {
      init(address);
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    plantFlag(cell, address);
    setHiddenMinesCount(hiddenMinesCount + isFlaggedCell(cell) ? 1 : -1);
  };

  const handleSmileyFaceClick = () => {
    reset();
    setIsInit(false);
    setIsBust(false);
    setIsVictory(false);
    setHiddenMinesCount(minesCount);
  };

  useDidUpdate(() => {
    if (field.some(isBustedCell)) setIsBust(true);
    else if (!reject(field, isMinedCell).some(isHiddenCell)) {
      markMines();
      setIsVictory(true);
    }
  }, field);

  return <div className='minesweeper'>
    <Indicators
      minesCount={hiddenMinesCount}
      isBust={isBust}
      isVictory={isVictory}
      isCountingSeconds={isInit && !(isBust || isVictory)}
      smileyFaceClickHandler={handleSmileyFaceClick}
    />
    <Field
      width={fieldDimension}
      disabled={isBust || isVictory}
      field={field}
      cellRevealHandler={handleCellReveal}
      flagPlantingHandler={handleFlagPlanting}
      neighborsRevealHandler={revealNeighbors}
    />
  </div>;
};
