import React, { useEffect, useState } from 'react';

import { Field, Indicators } from 'components';

import { FieldProducerFactory } from 'view-models/field-producer-factory';

import { fieldProducerType } from 'const';

import { useDidUpdate } from 'hooks/use-did-update';

import './Minesweeper.scss';

export const Minesweeper = () => {
  const [fieldProducer] = useState(new FieldProducerFactory(fieldProducerType.MD));

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
  }, [fieldProducer]);

  useDidUpdate(() => {
    if (fieldProducer.isBustedState(field)) setIsBust(true);
    else if (fieldProducer.isVictoriousState(field)) {
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
