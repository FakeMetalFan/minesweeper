import React, { useState } from 'react';

import { Field, FieldOptions, Indicators } from 'components';

import { FieldProducerFactory } from 'view-models/field-producer-factory';

import { fieldProducerType } from 'const';

import { useDidUpdate } from 'hooks/use-did-update';

export const Minesweeper = () => {
  const [fieldProducer, setFieldProducer] = useState(new FieldProducerFactory(fieldProducerType.SM));
  const [field, setField] = useState(fieldProducer.getEmptyState());
  const [isInit, setIsInit] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCellReveal = (cell, address) => {
    if (isInit) setField(fieldProducer.getCellRevealedState(field, cell, address));
    else {
      setField(fieldProducer.getInitialState(field, address));
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    setField(fieldProducer.getFlagPlantedState(field, cell, address));
  };

  const handleNeighborsReveal = address => {
    setField(fieldProducer.getNeighborsRevealedState(field, address));
  };

  const handleFieldOptions = fieldType => {
    setFieldProducer(new FieldProducerFactory(fieldType));
  };

  useDidUpdate(() => {
    setField(fieldProducer.getEmptyState());
  }, fieldProducer);

  useDidUpdate(() => {
    const isBust = fieldProducer.isBustedState(field);
    const isVictory = isBust ? false : fieldProducer.isVictoriousState(field);

    isVictory && setField(fieldProducer.getMinesMarkedState(field));

    (isBust || isVictory) && setIsGameOver(true);
  }, field);

  return (
    <div className='minesweeper'>
      <Indicators />

      <Field
        columnsCount={fieldProducer.width}
        disabled={isGameOver}
        state={field}
        cellRevealHandler={handleCellReveal}
        flagPlantingHandler={handleFlagPlanting}
        neighborsRevealHandler={handleNeighborsReveal}
      />

      <FieldOptions fieldOptionsHandler={handleFieldOptions} />
    </div>
  );
};
