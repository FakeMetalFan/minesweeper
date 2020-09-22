import React, { useEffect, useState } from 'react';

import reject from 'lodash/reject';
import some from 'lodash/some';

import { FieldProducer } from 'view-models/field-producer';

import { Field, Indicators } from 'components';

import { useDidUpdate } from 'hooks/use-did-update';

import './Minesweeper.scss';

export const Minesweeper = () => {
  const fieldDimension = 16;
  const minesCount = 30;

  const [fieldProducer] = useState(new FieldProducer(fieldDimension, fieldDimension, minesCount));
  const [field, setField] = useState([]);

  const [remainingMinesCount, setRemainingMinesCount] = useState(minesCount);

  const [isInit, setIsInit] = useState(false);
  const [isBust, setIsBust] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const updateField = () => {
    setField(fieldProducer.state);
  };

  const handleCellReveal = (cell, address) => {
    if (isInit) fieldProducer.setCellRevealedState(cell, address);
    else {
      fieldProducer.setInitialState(address)
      setIsInit(true);
    }

    updateField();
  };

  const handleFlagPlanting = (cell, address) => {
    fieldProducer.setFlagPlantedState(cell, address);

    setRemainingMinesCount(remainingMinesCount + (cell.isFlagged ? 1 : -1));

    updateField();
  };

  const handleNeighborsReveal = address => {
    fieldProducer.setNeighborsRevealedState(address);

    updateField();
  };

  const handleSmileyFaceClick = () => {
    fieldProducer.setEmptyState();

    setRemainingMinesCount(minesCount);
    setIsInit(false);
    setIsBust(false);
    setIsVictory(false);

    updateField();
  };

  useEffect(() => {
    fieldProducer.setEmptyState();

    updateField();
    // eslint-disable-next-line
  }, []);

  useDidUpdate(() => {
    if (some(field, 'isBustedMine')) setIsBust(true);
    else if (!some(reject(field, 'isMined'), 'isHidden')) {
      fieldProducer.setMinesMarkedState();

      setRemainingMinesCount(0);
      setIsVictory(true);

      updateField();
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
