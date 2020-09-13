import React, { useEffect, useState } from 'react';

import { Field } from 'components/Field/Field';

import { FieldStateProducerFactory } from 'view-models/field-state-producer-factory';

import { fieldStateProducerType } from 'const';

export const Minesweeper = () => {
  const [fieldStateProducer] = useState(new FieldStateProducerFactory(fieldStateProducerType.BG));
  const [fieldState, setFieldState] = useState([]);
  const [isInit, setIsInit] = useState(false);

  const handleCellClick = (cell, address) => {
    if (isInit) setFieldState(fieldStateProducer.getFloodFilledState(fieldState, cell, address));
    else {
      setFieldState(fieldStateProducer.getInitialState(fieldState, cell, address));
      setIsInit(true);
    }
  };

  useEffect(() => {
    setFieldState(fieldStateProducer.getEmptyState());
    setIsInit(false);
  }, [fieldStateProducer]);

  return (<Field columnsCount={fieldStateProducer.width} state={fieldState} cellClickHandler={handleCellClick} />);
};
