import React, { useEffect, useState } from 'react';

import { Field } from 'components';

import { FieldStateProducerFactory } from 'view-models/field-state-producer-factory';

import { fieldStateProducerType } from 'const';

export const Minesweeper = () => {
  const [fieldStateProducer] = useState(new FieldStateProducerFactory(fieldStateProducerType.SM));
  const [fieldState, setFieldState] = useState([]);
  const [isInit, setIsInit] = useState(false);

  const handleCellReveal = (cell, address) => {
    if (isInit) setFieldState(fieldStateProducer.getFloodFilledState(fieldState, cell, address));
    else {
      setFieldState(fieldStateProducer.getInitialState(fieldState, cell, address));
      setIsInit(true);
    }
  };

  const handleFlagPlanting = (cell, address) => {
    setFieldState(fieldStateProducer.getFlaggedState(fieldState, cell, address));
  };

  const handleNeighborsReveal = (cell, address) => {
    // setFieldState(fieldStateProducer.getNeighborsRevealedState(fieldState, cell, address));
  };

  useEffect(() => {
    setFieldState(fieldStateProducer.getEmptyState());
    setIsInit(false);
  }, [fieldStateProducer]);

  return (<Field
    columnsCount={fieldStateProducer.width}
    state={fieldState}
    cellRevealHandler={handleCellReveal}
    flagPlantingHandler={handleFlagPlanting}
    handleNeighborsReveal={handleNeighborsReveal}
  />);
};
