import produce from 'immer';

import difference from 'ramda/src/difference';
import range from 'ramda/src/range';

import { cellValue, cellState } from 'const';

import { Cell } from './cell';
import { CellNeighborsUtils } from './cell-neighbors-utils';

export class FieldStateProducer {
  _isInit = false;

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

  getState(state, cell, address) {
    if (this._isInit) return this._getFloodFilledState(state, cell, address);

    this._isInit = true;

    return this._getInitialState(state, cell, address);
  }

  getFlagPlantedState(state, { isFlagged }, address) {
    return produce(state, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    });
  }

  getNeighborsRevealedState(state, cell, address) {
    if (this._cellNeighborsUtils.isFloodFillAble(state, address))
      return this._getFloodFilledState(state, cell, address);

    return produce(state, draft => {
      this._cellNeighborsUtils.shouldRevealNeighbors(draft, address)
        && this._cellNeighborsUtils.getNeighborsAddresses(address).forEach(addr => {
          const cell = draft[addr];

          const { isMined, isFlagged } = cell;

          !isMined && isFlagged && (cell.value = cellValue.IncorrectGuess);

          cell.state = cellState.Visible;
        });
    });
  }

  _getInitialState(state, cell, excludedAddress) {
    return this._getFloodFilledState(this._getComputedState(state, excludedAddress), cell, excludedAddress);
  }

  _getFloodFilledState(state, { isMined }, cellAddress) {
    return produce(state, draft => {
      draft[cellAddress].state = cellState.Visible;

      const floodFill = neighborAddress => {
        this._cellNeighborsUtils.isFloodFillAble(draft, neighborAddress)
          && this._cellNeighborsUtils.getNeighborsAddresses(neighborAddress).forEach(address => {
            const { isMined, isHidden, isFlagged } = draft[address];

            if (!isMined && isHidden && !isFlagged) {
              draft[address].state = cellState.Visible;

              floodFill(address);
            }
        });
      };

      !isMined && floodFill(cellAddress);
    });
  }

  _getComputedState(state, excludedAddress) {
    return produce(this._getMinedState(state, excludedAddress), draft => {
      draft.forEach(({ isMined }, address) => {
        !isMined && (draft[address].value = this._cellNeighborsUtils.countMinedNeighbors(draft, address));
      });
    });
  }

  _getMinedState(state, excludedAddress) {
    return produce(state, draft => {
      this._getRandomAddresses(excludedAddress).forEach(address => {
        draft[address].value = cellValue.Mine;
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
