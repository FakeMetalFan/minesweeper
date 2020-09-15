import React, { useState } from 'react';

import { Field } from 'components';

import { FieldStateProducerFactory } from 'view-models/field-state-producer-factory';

import { fieldStateProducerType } from 'const';

export const Minesweeper = () => {
  const [fieldStateProducer] = useState(new FieldStateProducerFactory(fieldStateProducerType.SM));
  const [fieldState, setFieldState] = useState(fieldStateProducer.getEmptyState());

  const handleCellReveal = (cell, address) => {
    setFieldState(fieldStateProducer.getState(fieldState, cell, address));
  };

  const handleFlagPlanting = (cell, address) => {
    setFieldState(fieldStateProducer.getFlagPlantedState(fieldState, cell, address));
  };

  const handleNeighborsReveal = (cell, address) => {
    setFieldState(fieldStateProducer.getNeighborsRevealedState(fieldState, cell, address));
  };

  return (<Field
    columnsCount={fieldStateProducer.width}
    state={fieldState}
    cellRevealHandler={handleCellReveal}
    flagPlantingHandler={handleFlagPlanting}
    handleNeighborsReveal={handleNeighborsReveal}
  />);
};
