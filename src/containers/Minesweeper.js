import React, { useEffect, useState } from 'react';

import { fieldType } from 'const';

import { FieldFactory } from 'view-models';

import { Field } from 'components';

export const Minesweeper = () => {
  const [field] = useState(new FieldFactory(fieldType.BG));
  const [fieldState, setFieldState] = useState([]);
  const [isFieldStateComputed, setIsFieldStateComputed] = useState(false);

  const handleCellClick = (cell, rowAddress, cellAddress) => {
    if (isFieldStateComputed)
      setFieldState(field.getStateWithRevealedCell(cell, rowAddress, cellAddress, fieldState));
    else {
      setFieldState(field.getComputedState(rowAddress, cellAddress, fieldState));
      setIsFieldStateComputed(true);
    }
  };

  useEffect(() => {
    setFieldState(field.getInitialState());
    setIsFieldStateComputed(false);
  }, [field]);

  return (<Field state={fieldState} cellClickHandler={handleCellClick} />);
};
