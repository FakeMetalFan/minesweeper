import React, { useState } from 'react';

import { Field } from 'components';

import { FieldProducerFactory } from 'view-models/field-producer-factory';

import { fieldProducerType } from 'const';

import { useDidUpdate } from 'hooks/use-did-update';

export const Minesweeper = () => {
  const [fieldProducer] = useState(new FieldProducerFactory(fieldProducerType.SM));
  const [field, setField] = useState(fieldProducer.getEmptyState());

  const handleCellReveal = (cell, address) => {
    setField(fieldProducer.getState(field, cell, address));
  };

  const handleFlagPlanting = (cell, address) => {
    setField(fieldProducer.getFlagPlantedState(field, cell, address));
  };

  const handleNeighborsReveal = address => {
    setField(fieldProducer.getNeighborsRevealedState(field, address));
  };

  useDidUpdate(() => {
    console.log('you are fucking busted!');
  }, fieldProducer.isBust);

  return (<Field
    columnsCount={fieldProducer.width}
    state={field}
    cellRevealHandler={handleCellReveal}
    flagPlantingHandler={handleFlagPlanting}
    neighborsRevealHandler={handleNeighborsReveal}
  />);
};
