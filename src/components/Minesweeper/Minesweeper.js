import React, { useReducer } from 'react';

import produce from 'immer';

import reject from 'lodash/reject';

import { useField, useDidUpdate } from 'hooks';

import { isBustedCell, isFlaggedCell, isHiddenCell, isMinedCell } from 'utils/check-cell';

import { Field, Indicators } from '..';

import './Minesweeper.scss';

const actionType = {
  Init: 'init',
  HiddenMinesCountUpdate: 'hidden-mines-count-update',
  Reset: 'reset',
  Bust: 'bust',
  Victory: 'victory',
};

const reducer = (state, { type, payload }) => type === actionType.Reset ? { ...payload } : produce(state, draft => {
  switch (type) {
    case actionType.Init:
      draft.isInit = true;

      break;
    case actionType.HiddenMinesCountUpdate:
      draft.hiddenMinesCount += payload;

      break;
    case actionType.Bust:
      draft.isBust = true;

      break;
    case actionType.Victory:
      draft.hiddenMinesCount = 0;
      draft.isVictory = true;
  }
});

export const Minesweeper = ({ minesCount, fieldDimension }) => {
  const initialState = { hiddenMinesCount: minesCount, isInit: false, isBust: false, isVictory: false };

  const [{ hiddenMinesCount, isInit, isBust, isVictory }, dispatch] = useReducer(reducer, initialState);
  const {
    field,
    reset,
    init,
    revealCell,
    plantFlag,
    revealNeighbors,
    markMines,
  } = useField({ minesCount, width: fieldDimension, height: fieldDimension });

  const handleCellReveal = (cell, address) => {
    if (isInit) revealCell(cell, address);
    else {
      init(address)
      dispatch({ type: actionType.Init });
    }
  };

  const handleFlagPlanting = (cell, address) => {
    plantFlag(cell, address);
    dispatch({ type: actionType.HiddenMinesCountUpdate, payload: isFlaggedCell(cell) ? 1 : -1 });
  };

  const handleSmileyFaceClick = () => {
    reset();
    dispatch({ type: actionType.Reset, payload: initialState });
  };

  useDidUpdate(() => {
    if (field.some(isBustedCell)) dispatch({ type: actionType.Bust });
    else if (!reject(field, isMinedCell).some(isHiddenCell)) {
      markMines();
      dispatch({ type: actionType.Victory });
    }
  }, field);

  return <div className='minesweeper'>
    <Indicators
      minesCount={hiddenMinesCount}
      isBust={isBust}
      isVictory={isVictory}
      isCountingSeconds={isInit && !(isBust || isVictory)}
      smileyFaceClickHandler={handleSmileyFaceClick}
    />
    <Field
      width={fieldDimension}
      disabled={isBust || isVictory}
      field={field}
      cellRevealHandler={handleCellReveal}
      flagPlantingHandler={handleFlagPlanting}
      neighborsRevealHandler={revealNeighbors}
    />
  </div>;
};
