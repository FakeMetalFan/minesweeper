import React, { useState } from 'react';

import reject from 'lodash/reject';
import some from 'lodash/some';

import { useField, useDidUpdate } from 'hooks';

import { Field, Indicators } from '..';

import './Minesweeper.scss';

export const Minesweeper = () => {
  const fieldDimension = 16;
  const minesCount = 30;

  const {
    state: field,
    clear: clearField,
    init: initField,
    revealCell,
    plantFlag,
    revealNeighbors,
    markMines,
  } = useField({ minesCount, width: fieldDimension, height: fieldDimension });

  const [remainingMinesCount, setRemainingMinesCount] = useState(minesCount);

  const [isInit, setIsInit] = useState(false);
  const [isBust, setIsBust] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const handleCellReveal = (cell, address) => {
    if (isInit) revealCell(cell, address);
    else {
      initField(address)
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    plantFlag(cell, address);
    setRemainingMinesCount(remainingMinesCount + (cell.isFlagged ? 1 : -1));
  };

  const handleSmileyFaceClick = () => {
    clearField();
    setRemainingMinesCount(minesCount);
    setIsInit(false);
    setIsBust(false);
    setIsVictory(false);
  };

  useDidUpdate(() => {
    if (some(field, 'isBustedMine')) setIsBust(true);
    else if (!some(reject(field, 'isMined'), 'isHidden')) {
      markMines();
      setRemainingMinesCount(0);
      setIsVictory(true);
    }
  }, field);

  return (
    <div className='minesweeper'>
      <Indicators
        minesCount={remainingMinesCount}
        isBust={isBust}
        isVictory={isVictory}
        shouldStartCountingSeconds={isInit}
        smileyFaceClickHandler={handleSmileyFaceClick}
      />

      <Field
        columnsCount={fieldDimension}
        disabled={isBust || isVictory}
        state={field}
        cellRevealHandler={handleCellReveal}
        flagPlantingHandler={handleFlagPlanting}
        neighborsRevealHandler={revealNeighbors}
      />
    </div>
  );
};
