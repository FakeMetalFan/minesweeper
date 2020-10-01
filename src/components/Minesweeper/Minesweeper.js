import React, { useState } from 'react';

import reject from 'lodash/reject';
import some from 'lodash/some';

import { useMinesweeper, useDidUpdate } from 'hooks';

import { Field, Indicators } from '..';

import './Minesweeper.scss';

export const Minesweeper = () => {
  const fieldDimension = 16;
  const minesCount = 30;

  const {
    state,
    clear,
    init,
    revealCell,
    plantFlag,
    revealNeighbors,
    markMines,
  } = useMinesweeper({ minesCount, width: fieldDimension, height: fieldDimension });

  const [remainingMinesCount, setRemainingMinesCount] = useState(minesCount);

  const [isInit, setIsInit] = useState(false);
  const [isBust, setIsBust] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const handleCellReveal = (cell, address) => {
    if (isInit) revealCell(cell, address);
    else {
      init(address)
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    plantFlag(cell, address);
    setRemainingMinesCount(remainingMinesCount + (cell.isFlagged ? 1 : -1));
  };

  const handleSmileyFaceClick = () => {
    clear();
    setRemainingMinesCount(minesCount);
    setIsInit(false);
    setIsBust(false);
    setIsVictory(false);
  };

  useDidUpdate(() => {
    if (some(state, 'isBustedMine')) setIsBust(true);
    else if (!some(reject(state, 'isMined'), 'isHidden')) {
      markMines();
      setRemainingMinesCount(0);
      setIsVictory(true);
    }
  }, state);

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
        width={fieldDimension}
        disabled={isBust || isVictory}
        state={state}
        cellRevealHandler={handleCellReveal}
        flagPlantingHandler={handleFlagPlanting}
        neighborsRevealHandler={revealNeighbors}
      />
    </div>
  );
};
