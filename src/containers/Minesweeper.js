import React, { useEffect, useState } from 'react';

import { fieldType } from 'const';

import { FieldFactory } from 'view-models';

import { Field } from 'components';

export const Minesweeper = () => {
  const [field] = useState(new FieldFactory(fieldType.MD));
  const [fieldState, setFieldState] = useState([]);
  const [isInit, setIsInit] = useState(false);

  const handleCellClick = (cell, rowAddress, cellAddress) => {
    if (isInit) setFieldState(field.getFloodFilledState(cell, rowAddress, cellAddress, fieldState));
    else {
      setFieldState(field.getInitialState(rowAddress, cellAddress, fieldState));
      setIsInit(true);
    }
  };

  useEffect(() => {
    setFieldState(field.getEmptyState());
    setIsInit(false);
  }, [field]);

  return (<Field state={fieldState} cellClickHandler={handleCellClick} />);
};
