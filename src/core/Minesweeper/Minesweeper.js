import React, { useState } from 'react';

import reject from 'lodash/reject';
import some from 'lodash/some';

import { Field, Indicators } from 'components';

import { useField, useDidUpdate } from 'hooks';

import './Minesweeper.scss';

export const Minesweeper = () => {
  const fieldDimension = 16;
  const minesCount = 30;

  const [
    field,
    setEmptyFieldState,
    setInitialFieldState,
    setCellRevealedFieldState,
    setFlagPlantedFieldState,
    setNeighborsRevealedFieldState,
    setMinesMarkedFieldState,
  ] = useField({ minesCount, width: fieldDimension, height: fieldDimension });

  const [remainingMinesCount, setRemainingMinesCount] = useState(minesCount);

  const [isInit, setIsInit] = useState(false);
  const [isBust, setIsBust] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const handleCellReveal = (cell, address) => {
    if (isInit) setCellRevealedFieldState(cell, address);
    else {
      setInitialFieldState(address)
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    setFlagPlantedFieldState(cell, address);
    setRemainingMinesCount(remainingMinesCount + (cell.isFlagged ? 1 : -1));
  };

  const handleNeighborsReveal = address => {
    setNeighborsRevealedFieldState(address);
  };

  const handleSmileyFaceClick = () => {
    setEmptyFieldState();
    setRemainingMinesCount(minesCount);
    setIsInit(false);
    setIsBust(false);
    setIsVictory(false);
  };

  useDidUpdate(() => {
    if (some(field, 'isBustedMine')) setIsBust(true);
    else if (!some(reject(field, 'isMined'), 'isHidden')) {
      setMinesMarkedFieldState();
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
        neighborsRevealHandler={handleNeighborsReveal}
      />
    </div>
  );
};
