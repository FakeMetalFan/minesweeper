import produce from 'immer';

import difference from 'ramda/src/difference';
import range from 'ramda/src/range';

import { cellValue, cellVisibility } from 'const';

import { CellState } from './cell-state';
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
    return Array.from({ length: this._length }, () => new CellState());
  }

  getInitialState(state, cell, excludedAddress) {
    return this.getFloodFilledState(this._getComputedState(state, excludedAddress), cell, excludedAddress);
  }

  getFloodFilledState(state, cell, address) {
    return produce(state, draft => {
      draft[address] = new CellState(cell.value, cellVisibility.Visible);

      const floodFill = (target, targetAddress) => {
        if (!this._cellNeighborsUtils.countUnderminedNeighbors(draft, targetAddress))
          this._cellNeighborsUtils.getNeighborsAddresses(targetAddress).forEach(addr => {
            const neighbor = draft[addr];

            if (neighbor.isNotUndermined && neighbor.isHidden) {
              draft[addr] = new CellState(neighbor.value, cellVisibility.Visible);

              floodFill(neighbor, addr);
            }
          });
      };

      cell.isEmpty && floodFill(cell, address);
    });
  }

  _getComputedState(state, excludedAddress) {
    return produce(this._getUnderminedState(state, excludedAddress), draft => {
      draft.forEach((cell, addr) => {
        cell.isNotUndermined
          && (draft[addr] = new CellState(this._cellNeighborsUtils.countUnderminedNeighbors(draft, addr)));
      });
    });
  }

  _getUnderminedState(state, excludedAddress) {
    return produce(state, draft => {
      this._getRandomAddresses(excludedAddress).forEach(addr=> {
        draft[addr] = new CellState(cellValue.Mine);
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
