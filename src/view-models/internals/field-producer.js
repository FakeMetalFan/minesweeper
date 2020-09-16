import produce from 'immer';

import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import difference from 'lodash/difference';

import { cellValue, cellState } from 'const';

import { Cell } from './cell';
import { CellNeighborsUtils } from './cell-neighbors-utils';

export class FieldProducer {
  isBust = false;

  _isInit = false;

  constructor(
    width,
    height,
    minesCount
  ) {
    this.width = width;

    this._height = height;
    this._minesCount = minesCount;

    this._cellNeighborsUtils = new CellNeighborsUtils(width, height);
  }

  getEmptyState() {
    return Array.from({ length: this._length }, () => new Cell());
  }

  getState(state, cell, addr) {
    if (!this._isInit) {
      this._isInit = true;

      return this._getFloodFilledState(this._getComputedState(this._getCellRevealedState(state, addr), addr), addr);
    }

    if (cell.isMined) {
      this.isBust = true;

      return this._getBustedCellsState(produce(state, draft => {
        draft[addr] = new Cell(cellValue.BustedMine, cellState.Visible);
      }));
    }

    return this._getFloodFilledState(this._getCellRevealedState(state, addr), addr);
  }

  getFlagPlantedState(state, { isFlagged }, address) {
    return produce(state, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    });
  }

  getNeighborsRevealedState(state, addr) {
    if (this._cellNeighborsUtils.isFloodFillAble(state, addr)) return this._getFloodFilledState(state, addr);

    if (this._cellNeighborsUtils.shouldRevealNeighbors(state, addr)) {
      this.isBust = true;

      return this._getBustedCellsState(produce(state, draft => {
        this._cellNeighborsUtils.getNeighborsAddresses(addr).forEach(address => {
          const cell = draft[address];
          const { isUnrevealedMine, isMisplacedFlag } = cell;

          isUnrevealedMine && (cell.value = cellValue.BustedMine);
          isMisplacedFlag && (cell.value = cellValue.IncorrectGuess);

          cell.state = cellState.Visible;
        });
      }));
    }

    return cloneDeep(state);
  }

  _getCellRevealedState(state, address) {
    return produce(state, draft => {
      draft[address].state = cellState.Visible;
    });
  }

  _getFloodFilledState(state, address) {
    return produce(state, draft => {
      const floodFill = neighborAddr => {
        this._cellNeighborsUtils.isFloodFillAble(draft, neighborAddr)
          && this._cellNeighborsUtils.getNeighborsAddresses(neighborAddr).forEach(addr => {
            const cell = draft[addr];

            if (cell.isFloodFillAble) {
              cell.state = cellState.Visible;

              floodFill(addr);
            }
          });
      };

      floodFill(address);
    });
  }

  _getComputedState(state, excludedAddress) {
    return produce(this._getMinedState(state, excludedAddress), draft => {
      draft.forEach((cell, addr) => {
        !cell.isMined && (cell.value = this._cellNeighborsUtils.countMinedNeighbors(draft, addr));
      });
    });
  }

  _getBustedCellsState(state) {
    return produce(state, draft => {
      draft.forEach((cell, addr) => {
        const { isUnrevealedMine, isMisplacedFlag } = cell;

        isUnrevealedMine && (cell.state = cellState.Visible);
        isMisplacedFlag && (draft[addr] = new Cell(cellValue.IncorrectGuess, cellState.Visible));
      });
    });
  }

  _getMinedState(state, excludedAddress) {
    return produce(state, draft => {
      this._getRandomAddresses(excludedAddress).forEach(addr => {
        draft[addr].value = cellValue.Mine;
      });
    });
  }

  _getRandomAddresses(excludedAddress) {
    const addresses = difference(
      range(this._length),
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
