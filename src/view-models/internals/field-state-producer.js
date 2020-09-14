import produce from 'immer';

import difference from 'ramda/src/difference';
import range from 'ramda/src/range';

import { cellValue, cellState } from 'const';

import { Cell } from './cell';
import { CellNeighborsUtils } from './cell-neighbors-utils';

export class FieldStateProducer {
  constructor(
    width,
    height,
    minesCount
  ) {
    this.width = width;

    this._height = height;
    this._cellNeighborsUtils = new CellNeighborsUtils(width, height);
    this._minesCount = minesCount;
  }

  getEmptyState() {
    return Array.from({ length: this._length }, () => new Cell());
  }

  getInitialState(state, cell, excludedAddress) {
    return this.getFloodFilledState(this._getComputedState(state, excludedAddress), cell, excludedAddress);
  }

  getFloodFilledState(state, { value, isEmpty }, cellAddress) {
    return produce(state, draft => {
      draft[cellAddress] = new Cell(value, cellState.Visible);

      const floodFill = neighborAddress => {
        if (!this._cellNeighborsUtils.countMinedNeighbors(draft, neighborAddress))
          this._cellNeighborsUtils.getNeighborsAddresses(neighborAddress).forEach(address => {
            const { isMined, isHidden, isFlagged, value: neighborValue } = draft[address];

            if (!isMined && isHidden && !isFlagged) {
              draft[address] = new Cell(neighborValue, cellState.Visible);

              floodFill(address);
            }
          });
      };

      isEmpty && floodFill(cellAddress);
    });
  }

  getFlaggedState(state, { value, isFlagged }, address) {
    return produce(state, draft => {
      draft[address] = new Cell(value, cellState[isFlagged ? 'Hidden' : 'Flagged']);
    });
  }

  getNeighborsRevealedState(state, cell, address) {
    return []
  }

  _getComputedState(state, excludedAddress) {
    return produce(this._getMinedState(state, excludedAddress), draft => {
      draft.forEach(({ isMined, state: cellState }, address) => {
        !isMined
          && (draft[address] = new Cell(this._cellNeighborsUtils.countMinedNeighbors(draft, address), cellState));
      });
    });
  }

  _getMinedState(state, excludedAddress) {
    return produce(state, draft => {
      this._getRandomAddresses(excludedAddress).forEach(address => {
        draft[address] = new Cell(cellValue.Mine, draft[address].state);
      });
    });
  }

  _getRandomAddresses(excludedAddress) {
    const addresses = difference(
      range(0, this._length),
      [excludedAddress, ...this._cellNeighborsUtils.getNeighborsAddresses(excludedAddress)]
    );

    const randomAddresses = new Set();

    while (randomAddresses.size < this._minesCount)
      randomAddresses.add(addresses[Math.random() * addresses.length | 0]);

    return [...randomAddresses];
  }

  get _length() {
    return this.width * this._height;
  }
}
