import produce from 'immer';

import { cellState, cellValue } from 'const';

import { Cell } from './cell';

export class Field {
  constructor(
    width,
    height,
    minesCount
  ) {
    this.width = width;
    this.height = height;
    this.minesCount = minesCount;
  }

  getInitialState() {
    return Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => new Cell()));
  }

  getComputedState(excludedRowAddress, excludedCellAddress, state) {
    return produce(this._getUnderminedState(excludedRowAddress, excludedCellAddress, state), draft => {
      draft.forEach((row, rowAddress) => {
        row.forEach((cell, cellAddress) => {
          !cell.isUndermined && (draft[rowAddress][cellAddress] =
            this._getComputedCell(cell, rowAddress, cellAddress, draft)
          );
        });
      });

      // TODO: must be flood filled!
      draft[excludedRowAddress][excludedCellAddress] = new Cell(cellValue.Empty, cellState.Visible);
    });
  }

  getStateWithRevealedCell({ value }, rowAddress, cellAddress, state) {
    return produce(state, draft => {
      draft[rowAddress][cellAddress] = new Cell(value, cellState.Visible);
    });
  }

  _getUnderminedState(excludedRowAddress, excludedCellAddress, state) {
    return produce(state, draft => {
      this._getRandomCellsAddresses(excludedRowAddress, excludedCellAddress, state)
        .forEach(([rowAddress, cellAddress]) => {
          draft[rowAddress][cellAddress] = new Cell(cellValue.Mine);
        });
    });
  }

  _getRandomCellsAddresses(excludedRowAddress, excludedCellAddress, state) {
    const addresses = this._getCellsAddresses(excludedRowAddress, excludedCellAddress, state);
    const randomAddresses = new Set();

    while (randomAddresses.size < this.minesCount) randomAddresses.add(Math.random() * addresses.length | 0);

    return Array.from(randomAddresses, address => addresses[address]);
  }

  _getCellsAddresses(excludedRowAddress, excludedCellAddress, state) {
    return state.reduce((acc, row, rowAddress) => {
      row.forEach((_, cellAddress) => {
        rowAddress !== excludedRowAddress && cellAddress !== excludedCellAddress
          && acc.push([rowAddress, cellAddress]);
      });

      return acc;
    }, []);
  }

  _getComputedCell(cell, rowAddress, cellAddress, state) {
    let value = 0;

    for (let rowAddressOffset = -1; rowAddressOffset < 2; rowAddressOffset++)
      for (let cellAddressOffset = -1; cellAddressOffset < 2; cellAddressOffset++)
        (rowAddressOffset || cellAddressOffset)
          && state[rowAddress + rowAddressOffset]?.[cellAddress + cellAddressOffset]?.isUndermined && value++;

    return new Cell(value);
  }
}
