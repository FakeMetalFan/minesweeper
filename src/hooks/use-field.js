import { useState, useMemo } from 'react';

import produce from 'immer';

import difference from 'lodash/difference';
import range from 'lodash/range';

import { cellState, cellValue } from 'const';

import { CellNeighborsUtils } from 'view-models';

import { isMinedCell, isHiddenCell, isFlaggedCell } from 'utils/check-cell';

export const useField = ({ width, height, minesCount }) => {
  const length = width * height;

  const cellNeighborsUtils = useMemo(() => new CellNeighborsUtils(width, height), [length]);
  const emptyField = useMemo(() => Array(length).fill({ value: cellValue.Empty, state: cellState.Hidden }), [length]);

  const [field, setField] = useState(emptyField);

  const getFloodFilledField = (address, draftFn) => produce(field, draft => {
    /* eslint-disable-line */ draftFn?.(draft);
    draft[address].state = cellState.Visible;

    const floodFill = cellAdr => {
      cellNeighborsUtils.canFloodFill(draft, cellAdr) && cellNeighborsUtils.getAddresses(cellAdr).forEach(adr => {
        const cell = draft[adr];

        if (!isMinedCell(cell) && isHiddenCell(cell) && !isFlaggedCell(cell)) {
          cell.state = cellState.Visible;

          floodFill(adr);
        }
      });
    };

    floodFill(address);
  });

  const getBustedField = draftFn => produce(field, draft => {
    draftFn(draft);
    draft.forEach((cell, adr) => {
      isMinedCell(cell) && !isFlaggedCell(cell) && (cell.state = cellState.Visible);
      !isMinedCell(cell) && isFlaggedCell(cell) && (draft[adr] = {
        value: cellValue.IncorrectGuess,
        state: cellState.Visible,
      });
    });
  });

  const reset = () => {
    setField(emptyField);
  };

  const init = address => {
    setField(getFloodFilledField(address, draft => {
      const addresses = difference(range(length), [address, ...cellNeighborsUtils.getAddresses(address)]);
      const randomAddresses = new Set;

      while (randomAddresses.size < minesCount) randomAddresses.add(addresses[Math.random() * addresses.length | 0]);

      randomAddresses.forEach(adr => {
        draft[adr].value = cellValue.Mine;
      });

      draft.forEach((cell, adr) => {
        !isMinedCell(cell) && (cell.value = cellNeighborsUtils.getMinedCount(draft, adr));
      });
    }));
  };

  const revealCell = (cell, address) => {
    setField(isMinedCell(cell) ? getBustedField(draft => {
      draft[address] = { value: cellValue.BustedMine, state: cellState.Visible };
    }) : getFloodFilledField(address));
  };

  const plantFlag = (cell, address) => {
    setField(produce(field, draft => {
      draft[address].state = cellState[isFlaggedCell(cell) ? 'Hidden' : 'Flagged'];
    }));
  };

  const revealNeighbors = address => {
    if (cellNeighborsUtils.canFloodFill(field, address)) setField(getFloodFilledField(address));
    else if (cellNeighborsUtils.canRevealNeighbors(field, address)) setField(getBustedField(draft => {
      cellNeighborsUtils.getAddresses(address).forEach(adr => {
        const cell = draft[adr];

        isMinedCell(cell) && !isFlaggedCell(cell) && (cell.value = cellValue.BustedMine);
        !isMinedCell(cell) && isFlaggedCell(cell) && (cell.value = cellValue.IncorrectGuess);

        cell.state = cellState.Visible;
      });
    }));
  };

  const markMines = () => {
    setField(produce(field, draft => {
      draft.forEach(cell => {
        isMinedCell(cell) && (cell.state = cellState.Flagged);
      });
    }));
  };

  return { field, reset, init, revealCell, plantFlag, revealNeighbors, markMines };
};
