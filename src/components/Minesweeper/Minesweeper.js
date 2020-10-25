import React, { useState } from 'react';

import produce from 'immer';

import reject from 'lodash/reject';
import some from 'lodash/some';

import { useField, useDidUpdate } from 'hooks';

import { Field, Indicators } from '..';

import './Minesweeper.scss';

export const Minesweeper = ({ minesCount, fieldDimension }) => {
  const {
    state: fieldState,
    reset,
    init,
    revealCell,
    plantFlag,
    revealNeighbors,
    markMines,
  } = useField({ minesCount, width: fieldDimension, height: fieldDimension });

  const initialState = { remainingMinesCount: minesCount, isInit: false, isBust: false, isVictory: false };

  const [state, setState] = useState(initialState);

  const { remainingMinesCount, isInit, isBust, isVictory } = state;

  const handleCellReveal = (cell, address) => {
    if (isInit) revealCell(cell, address);
    else {
      init(address)
      setState(produce(state, draft => {
        draft.isInit = true;
      }));
    }
  };

  const handleFlagPlanting = (cell, address) => {
    plantFlag(cell, address);
    setState(produce(state, draft => {
      draft.remainingMinesCount += cell.hasFlag ? 1 : -1;
    }));
  };

  const handleSmileyFaceClick = () => {
    reset();
    setState({ ...initialState });
  };

  useDidUpdate(() => {
    if (some(fieldState, 'hasBustedMine')) setState(produce(state, draft => {
      draft.isBust = true;
    }));
    else if (!some(reject(fieldState, 'hasMine'), 'isHidden')) {
      markMines();
      setState(produce(state, draft => {
        draft.remainingMinesCount = 0;
        draft.isVictory = true;
      }));
    }
  }, fieldState);

  return <div className='minesweeper'>
    <Indicators
      minesCount={remainingMinesCount}
      isBust={isBust}
      isVictory={isVictory}
      shouldStartCountingSeconds={isInit}
      smileyFaceClickHandler={handleSmileyFaceClick}
    />

    <Field
      width={fieldDimension}
      disabled={isBust || isVictory}
      state={fieldState}
      cellRevealHandler={handleCellReveal}
      flagPlantingHandler={handleFlagPlanting}
      neighborsRevealHandler={revealNeighbors}
    />
  </div>;
};
