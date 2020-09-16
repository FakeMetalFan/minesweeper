import produce from 'immer';

import difference from 'ramda/src/difference';
import range from 'ramda/src/range';

import { cellValue, cellState } from 'const';

import { Cell } from './cell';
import { CellNeighborsUtils } from './cell-neighbors-utils';

export class FieldStateProducer {
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

  getState(state, cell, address) {
    if (!this._isInit) {
      this._isInit = true;

      return this._getInitialState(this._getCellRevealedState(state, address), address);
    }

    if (cell.isMined) {
      this.isBust = true;

      return this._getBustedState(state, address);
    }

    return this._getFloodFilledState(this._getCellRevealedState(state, address), address);
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

      return this._getBustedNeighborsState(state, addr);
    }

    return state;
  }

  _getInitialState(state, excludedAddress) {
    return this._getFloodFilledState(this._getComputedState(state, excludedAddress), excludedAddress);
  }

  _getBustedState(state, address) {
    return this._getBustedCellsState(produce(state, draft => {
      draft[address] = new Cell(cellValue.BustedMine, cellState.Visible);
    }));
  }

  _getBustedCellsState(state) {
    return produce(state, draft => {
      draft.forEach((cell, addr) => {
        const { isMined, isFlagged } = cell;

        isMined && !isFlagged && (cell.state = cellState.Visible);
        !isMined && isFlagged && (draft[addr] = new Cell(cellValue.IncorrectGuess, cellState.Visible));
      });
    });
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

  _getMinedState(state, excludedAddress) {
    return produce(state, draft => {
      this._getRandomAddresses(excludedAddress).forEach(addr => {
        draft[addr].value = cellValue.Mine;
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

  _getBustedNeighborsState(state, address) {
    return this._getBustedCellsState(produce(state, draft => {
      this._cellNeighborsUtils.getNeighborsAddresses(address).forEach(addr => {
        const cell = draft[addr];
        const { isMined, isFlagged } = cell;

        !isMined && isFlagged && (cell.value = cellValue.IncorrectGuess);
        isMined && !isFlagged && (cell.value = cellValue.BustedMine);

        cell.state = cellState.Visible;
      });
    }));
  }

  get _length() {
    return this.width * this._height;
  }
}
