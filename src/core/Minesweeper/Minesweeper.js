import React, { useEffect, useState } from 'react';

import reject from 'lodash/reject';
import some from 'lodash/some';

import { FieldProducer } from 'view-models/field-producer';

import { Field, Indicators } from 'components';

import { useDidUpdate } from 'hooks/use-did-update';

import './Minesweeper.scss';

export const Minesweeper = () => {
  const [fieldProducer] = useState(new FieldProducer(16, 16, 30));
  const [field, setField] = useState([]);

  const [minesCount, setMinesCount] = useState(fieldProducer.minesCount);

  const [isInit, setIsInit] = useState(false);
  const [isBust, setIsBust] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const handleCellReveal = (cell, address) => {
    if (isInit) setField(fieldProducer.getCellRevealedState(field, cell, address));
    else {
      setField(fieldProducer.getInitialState(field, address));
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    setField(fieldProducer.getFlagPlantedState(field, cell, address));
    setMinesCount(minesCount + (cell.isFlagged ? 1 : -1));
  };

  const handleNeighborsReveal = address => {
    setField(fieldProducer.getNeighborsRevealedState(field, address));
  };

  const handleSmileyFaceClick = () => {
    setField(fieldProducer.getEmptyState());
    setMinesCount(fieldProducer.minesCount);
    setIsInit(false);
    setIsBust(false);
    setIsVictory(false);
  };

  useEffect(() => {
    setField(fieldProducer.getEmptyState());
    // eslint-disable-next-line
  }, []);

  useDidUpdate(() => {
    if (some(field, 'isBustedMine')) setIsBust(true);
    else if (!some(reject(field, 'isMined'), 'isHidden')) {
      setField(fieldProducer.getMinesMarkedState(field));
      setMinesCount(0);
      setIsVictory(true);
    }
  }, field);

  return (
    <div className='minesweeper'>
      <Indicators
        minesCount={minesCount}
        isBust={isBust}
        isVictory={isVictory}
        shouldStartCountingSeconds={isInit}
        smileyFaceClickHandler={handleSmileyFaceClick}
      />

      <Field
        columnsCount={fieldProducer.width}
        disabled={isBust || isVictory}
        state={field}
        cellRevealHandler={handleCellReveal}
        flagPlantingHandler={handleFlagPlanting}
        neighborsRevealHandler={handleNeighborsReveal}
      />
    </div>
  );
};
