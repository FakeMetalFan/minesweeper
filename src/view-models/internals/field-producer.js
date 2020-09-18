import produce from 'immer';

import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import difference from 'lodash/difference';
import reject from 'lodash/reject';
import some from 'lodash/some';

import { cellValue, cellState } from 'const';

import { Cell } from './cell';
import { CellNeighborsUtils } from './cell-neighbors-utils';

export class FieldProducer {
  constructor(
    width,
    height,
    minesCount
  ) {
    this.width = width;
    this.minesCount = minesCount;

    this._height = height;
    this._cellNeighborsUtils = new CellNeighborsUtils(width, height);
  }

  getEmptyState() {
    return Array.from({ length: this._length }, () => new Cell());
  }

  getInitialState(state, address) {
    return this._getFloodFilledState(produce(state, draft => {
      const addresses =
        difference(range(this._length), [address, ...this._cellNeighborsUtils.getNeighborsAddresses(address)]);

      const randomAddressesSet = new Set();

      while (randomAddressesSet.size < this.minesCount)
        randomAddressesSet.add(addresses[Math.random() * addresses.length | 0]);

      randomAddressesSet.forEach(addr => {
        draft[addr].value = cellValue.Mine;
      });

      draft.forEach((cell, addr) => {
        !cell.isMined && (cell.value = this._cellNeighborsUtils.countMinedNeighbors(draft, addr));
      });
    }), address);
  }

  getCellRevealedState(state, { isMined }, addr) {
    if (isMined) return this._getBustedState(produce(state, draft => {
      draft[addr] = new Cell(cellValue.BustedMine, cellState.Visible);
    }));

    return this._getFloodFilledState(state, addr);
  }

  getFlagPlantedState(state, { isFlagged }, address) {
    return produce(state, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    });
  }

  getNeighborsRevealedState(state, addr) {
    if (this._cellNeighborsUtils.isFloodFillAble(state, addr)) return this._getFloodFilledState(state, addr);

    if (this._cellNeighborsUtils.canRevealNeighbors(state, addr)) return this._getBustedState(produce(state, draft => {
      this._cellNeighborsUtils.getNeighborsAddresses(addr).forEach(address => {
        const cell = draft[address];
        const { isUnrevealedMine, isMisplacedFlag } = cell;

        isUnrevealedMine && (cell.value = cellValue.BustedMine);
        isMisplacedFlag && (cell.value = cellValue.IncorrectGuess);

        cell.state = cellState.Visible;
      });
    }));

    return cloneDeep(state);
  }

  isBustedState(state) {
    return some(state, 'isBustedMine');
  }

  isVictoriousState(state) {
    return !some(reject(state, 'isMined'), 'isHidden');
  }

  getMinesMarkedState(state) {
    return produce(state, draft => {
      draft.forEach(cell => {
        cell.isMined && (cell.state = cellState.Flagged);
      });
    });
  }

  _getFloodFilledState(state, address) {
    return produce(state, draft => {
      draft[address].state = cellState.Visible;

      const floodFill = neighborAddress => {
        this._cellNeighborsUtils.isFloodFillAble(draft, neighborAddress)
          && this._cellNeighborsUtils.getNeighborsAddresses(neighborAddress).forEach(addr => {
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

  _getBustedState(state) {
    return produce(state, draft => {
      draft.forEach((cell, addr) => {
        const { isUnrevealedMine, isMisplacedFlag } = cell;

        isUnrevealedMine && (cell.state = cellState.Visible);
        isMisplacedFlag && (draft[addr] = new Cell(cellValue.IncorrectGuess, cellState.Visible));
      });
    });
  }

  get _length() {
    return this.width * this._height;
  }
}
