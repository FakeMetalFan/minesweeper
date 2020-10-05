import { useState, useMemo } from 'react';

import produce from 'immer';

import difference from 'lodash/difference';
import range from 'lodash/range';
import cloneDeep from 'lodash/cloneDeep';

import { cellState, cellValue } from 'const';

import { CellVM, CellNeighborsUtils } from 'view-models';

export const useMinesweeper = ({ width, height, minesCount }) => {
  const length = width * height;

  const emptyState = useMemo(() => Array(length).fill(new CellVM), [length]);
  const cellNeighborsUtils = useMemo(() => new CellNeighborsUtils(width, height), [width, height]);

  const [state, setState] = useState(emptyState);

  const getFloodFilledState = (prevState, address, draftFn) => produce(prevState, draft => {
    /* eslint-disable-line */ draftFn?.(draft);

    draft[address].state = cellState.Visible;

    const floodFill = cellAddr => {
      cellNeighborsUtils.canFloodFill(draft, cellAddr) && cellNeighborsUtils.getAddresses(cellAddr).forEach(addr => {
        const cell = draft[addr];
        const { isMined, isHidden, isFlagged } = cell;

        if (!isMined && isHidden && !isFlagged) {
          cell.state = cellState.Visible;

          floodFill(addr);
        }
      });
    };

    floodFill(address);
  });

  const getBustedState = (prevState, draftFn) => produce(prevState, draft => {
    draftFn(draft);

    draft.forEach((cell, addr) => {
      const { isUnrevealedMine, isMisplacedFlag } = cell;

      isUnrevealedMine && (cell.state = cellState.Visible);
      isMisplacedFlag && (draft[addr] = new CellVM(cellValue.IncorrectGuess, cellState.Visible));
    });
  });

  const clear = () => {
    setState(emptyState);
  };

  const init = address => {
    setState(prevState => getFloodFilledState(prevState, address, draft => {
      const addresses = difference(range(length), [address, ...cellNeighborsUtils.getAddresses(address)]);
      const randomAddresses = new Set;

      while (randomAddresses.size < minesCount) randomAddresses.add(addresses[Math.random() * addresses.length | 0]);

      randomAddresses.forEach(addr => {
        draft[addr].value = cellValue.Mine;
      });

      draft.forEach((cell, addr) => {
        !cell.isMined && (cell.value = cellNeighborsUtils.getMinedCount(draft, addr));
      });
    }));
  };

  const revealCell = ({ isMined }, address) => {
    setState(prevState => isMined ? getBustedState(prevState, draft => {
      draft[address] = new CellVM(cellValue.BustedMine, cellState.Visible);
    }) : getFloodFilledState(prevState, address));
  };

  const plantFlag = ({ isFlagged }, address) => {
    setState(prevState => produce(prevState, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    }));
  };

  const revealNeighbors = address => {
    setState(prevState => {
      if (cellNeighborsUtils.canFloodFill(prevState, address)) return getFloodFilledState(prevState, address);

      if (cellNeighborsUtils.canRevealNeighbors(prevState, address)) return getBustedState(prevState, draft => {
        cellNeighborsUtils.getAddresses(address).forEach(addr => {
          const cell = draft[addr];
          const { isUnrevealedMine, isMisplacedFlag } = cell;

          isUnrevealedMine && (cell.value = cellValue.BustedMine);
          isMisplacedFlag && (cell.value = cellValue.IncorrectGuess);

          cell.state = cellState.Visible;
        });
      });

      return cloneDeep(prevState);
    });
  };

  const markMines = () => {
    setState(prevState => produce(prevState, draft => {
      draft.forEach(cell => {
        cell.isMined && (cell.state = cellState.Flagged);
      });
    }));
  };

  return { state, clear, init, revealCell, plantFlag, revealNeighbors, markMines };
};
