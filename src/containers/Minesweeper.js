import React, { useState } from 'react';

import { Field } from 'components';

import { FieldStateProducerFactory } from 'view-models/field-state-producer-factory';

import { fieldStateProducerType } from 'const';

import { useDidUpdate } from 'hooks/use-did-update';

export const Minesweeper = () => {
  const [fieldStateProducer] = useState(new FieldStateProducerFactory(fieldStateProducerType.SM));
  const [fieldState, setFieldState] = useState(fieldStateProducer.getEmptyState());

  const handleCellReveal = (cell, address) => {
    setFieldState(fieldStateProducer.getState(fieldState, cell, address));
  };

  const handleFlagPlanting = (cell, address) => {
    setFieldState(fieldStateProducer.getFlagPlantedState(fieldState, cell, address));
  };

  const handleNeighborsReveal = address => {
    setFieldState(fieldStateProducer.getNeighborsRevealedState(fieldState, address));
  };

  useDidUpdate(() => {
    console.log('you are fucking busted!');
  }, fieldStateProducer.isBust);

  return (<Field
    columnsCount={fieldStateProducer.width}
    state={fieldState}
    cellRevealHandler={handleCellReveal}
    flagPlantingHandler={handleFlagPlanting}
    neighborsRevealHandler={handleNeighborsReveal}
  />);
};
