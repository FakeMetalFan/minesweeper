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

  getEmptyState() {
    return Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => new Cell()));
  }

  getInitialState(excludedRowAddress, excludedCellAddress, state) {
    return this.getFloodFilledState(
      new Cell(cellValue.Empty, cellState.Visible),
      excludedRowAddress,
      excludedCellAddress,
      this._getComputedState(excludedRowAddress, excludedCellAddress, state),
    );
  }

  getFloodFilledState(cell, rowAddress, cellAddress, state) {
    return produce(state, draft => {
      draft[rowAddress][cellAddress] = new Cell(cell.value, cellState.Visible);

      const floodFill = (target, targetRowAddress, targetCellAddress) => {
        if (this._getUnderminedNeighborsCount(target, targetRowAddress, targetCellAddress, draft)) return;

        for (let targetRowAddressOffset = -1; targetRowAddressOffset < 2; targetRowAddressOffset++)
          for (let targetCellAddressOffset = -1; targetCellAddressOffset < 2; targetCellAddressOffset++)
            if (targetRowAddressOffset || targetCellAddressOffset) {
              const neighborRowAddress = targetRowAddress + targetRowAddressOffset;
              const neighborCellAddress = targetCellAddress + targetCellAddressOffset;

              const neighbor = draft[neighborRowAddress]?.[neighborCellAddress];

              if (neighbor && !neighbor.isVisible && !neighbor.isUndermined) {
                draft[neighborRowAddress][neighborCellAddress] = new Cell(neighbor.value, cellState.Visible);

                floodFill(neighbor, neighborRowAddress, neighborCellAddress);
              }
            }
      };

      cell.isEmpty && floodFill(cell, rowAddress, cellAddress, draft);
    });
  }

  _getComputedState(excludedRowAddress, excludedCellAddress, state) {
    return produce(this._getUnderminedState(excludedRowAddress, excludedCellAddress, state), draft => {
      draft.forEach((row, rowAddress) => {
        row.forEach((cell, cellAddress) => {
          !cell.isUndermined && (draft[rowAddress][cellAddress] =
            new Cell(this._getUnderminedNeighborsCount(cell, rowAddress, cellAddress, draft))
          );
        });
      });
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
        !((rowAddress === excludedRowAddress - 1 && cellAddress === excludedCellAddress - 1)
          || (rowAddress === excludedRowAddress - 1 && cellAddress === excludedCellAddress)
          || (rowAddress === excludedRowAddress - 1 && cellAddress === excludedCellAddress + 1)
          || (rowAddress === excludedRowAddress && cellAddress === excludedCellAddress - 1)
          || (rowAddress === excludedRowAddress && cellAddress === excludedCellAddress)
          || (rowAddress === excludedRowAddress && cellAddress === excludedCellAddress + 1)
          || (rowAddress === excludedRowAddress + 1 && cellAddress === excludedCellAddress - 1)
          || (rowAddress === excludedRowAddress + 1 && cellAddress === excludedCellAddress)
          || (rowAddress === excludedRowAddress + 1 && cellAddress === excludedCellAddress + 1)
        ) && acc.push([rowAddress, cellAddress]);
      });

      return acc;
    }, []);
  }

  _getUnderminedNeighborsCount(cell, rowAddress, cellAddress, state) {
    let count = 0;

    for (let rowAddressOffset = -1; rowAddressOffset < 2; rowAddressOffset++)
      for (let cellAddressOffset = -1; cellAddressOffset < 2; cellAddressOffset++)
        (rowAddressOffset || cellAddressOffset)
          && state[rowAddress + rowAddressOffset]?.[cellAddress + cellAddressOffset]?.isUndermined && count++;

    return count;
  }
}
