import { useState, useMemo } from 'react';

import produce from 'immer';

import difference from 'lodash/difference';
import range from 'lodash/range';

import { cellState, cellValue } from 'const';

import { CellVM, CellNeighborsUtils } from 'view-models';

export const useField = ({ width, height, minesCount }) => {
  const length = width * height;

  const emptyState = useMemo(() => Array(length).fill(new CellVM), [length]);
  const cellNeighborsUtils = useMemo(() => new CellNeighborsUtils(width, height), [width, height]);

  const [state, setState] = useState(emptyState);

  const getFloodFilledState = (prevState, address, draftFn) => produce(prevState, draft => {
    /* eslint-disable-line */ draftFn?.(draft);

    draft[address].state = cellState.Visible;

    const floodFill = cellAdr => {
      cellNeighborsUtils.canFloodFill(draft, cellAdr) && cellNeighborsUtils.getAddresses(cellAdr).forEach(adr => {
        const cell = draft[adr];
        const { hasMine, isHidden, hasFlag } = cell;

        if (!hasMine && isHidden && !hasFlag) {
          cell.state = cellState.Visible;

          floodFill(adr);
        }
      });
    };

    floodFill(address);
  });

  const getBustedState = (prevState, draftFn) => produce(prevState, draft => {
    draftFn(draft);

    draft.forEach((cell, adr) => {
      const { hasUnrevealedMine, hasMisplacedFlag } = cell;

      hasUnrevealedMine && (cell.state = cellState.Visible);
      hasMisplacedFlag && (draft[adr] = new CellVM(cellValue.IncorrectGuess, cellState.Visible));
    });
  });

  const reset = () => {
    setState(emptyState);
  };

  const init = address => {
    setState(getFloodFilledState(state, address, draft => {
      const addresses = difference(range(length), [address, ...cellNeighborsUtils.getAddresses(address)]);
      const randomAddresses = new Set;

      while (randomAddresses.size < minesCount) randomAddresses.add(addresses[Math.random() * addresses.length | 0]);

      randomAddresses.forEach(adr => {
        draft[adr].value = cellValue.Mine;
      });

      draft.forEach((cell, adr) => {
        !cell.hasMine && (cell.value = cellNeighborsUtils.getMinedCount(draft, adr));
      });
    }));
  };

  const revealCell = ({ hasMine }, address) => {
    setState(hasMine ? getBustedState(state, draft => {
      draft[address] = new CellVM(cellValue.BustedMine, cellState.Visible);
    }) : getFloodFilledState(state, address));
  };

  const plantFlag = ({ hasFlag }, address) => {
    setState(produce(state, draft => {
      draft[address].state = cellState[hasFlag ? 'Hidden' : 'Flagged'];
    }));
  };

  const revealNeighbors = address => {
    setState(() => {
      if (cellNeighborsUtils.canFloodFill(state, address)) return getFloodFilledState(state, address);

      if (cellNeighborsUtils.canRevealNeighbors(state, address)) return getBustedState(state, draft => {
        cellNeighborsUtils.getAddresses(address).forEach(adr => {
          const cell = draft[adr];
          const { hasUnrevealedMine, hasMisplacedFlag } = cell;

          hasUnrevealedMine && (cell.value = cellValue.BustedMine);
          hasMisplacedFlag && (cell.value = cellValue.IncorrectGuess);

          cell.state = cellState.Visible;
        });
      });

      return state;
    });
  };

  const markMines = () => {
    setState(produce(state, draft => {
      draft.forEach(cell => {
        cell.hasMine && (cell.state = cellState.Flagged);
      });
    }));
  };

  return { state, reset, init, revealCell, plantFlag, revealNeighbors, markMines };
};
