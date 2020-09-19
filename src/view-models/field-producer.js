import produce from 'immer';

import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import difference from 'lodash/difference';

import { cellValue, cellState } from 'const';

import { Cell, CellNeighborsUtils } from './internals';

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
    return this._getFloodFilledState(state, address, draft => {
      const addresses = difference(range(this._length), [address, ...this._cellNeighborsUtils.getAddresses(address)]);
      const randomAddresses = new Set();

      while (randomAddresses.size < this.minesCount)
        randomAddresses.add(addresses[Math.random() * addresses.length | 0]);

      randomAddresses.forEach(addr => {
        draft[addr].value = cellValue.Mine;
      });

      draft.forEach((cell, addr) => {
        !cell.isMined && (cell.value = this._cellNeighborsUtils.getMinedCount(draft, addr));
      });
    });
  }

  getCellRevealedState(state, { isMined }, address) {
    if (isMined) return this._getBustedState(state, draft => {
      draft[address] = new Cell(cellValue.BustedMine, cellState.Visible);
    });

    return this._getFloodFilledState(state, address);
  }

  getFlagPlantedState(state, { isFlagged }, address) {
    return produce(state, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    });
  }

  getNeighborsRevealedState(state, address) {
    if (this._cellNeighborsUtils.canFloodFill(state, address)) return this._getFloodFilledState(state, address);

    if (this._cellNeighborsUtils.canRevealNeighbors(state, address)) return this._getBustedState(state, draft => {
      this._cellNeighborsUtils.getAddresses(address).forEach(addr=> {
        const cell = draft[addr];
        const { isUnrevealedMine, isMisplacedFlag } = cell;

        isUnrevealedMine && (cell.value = cellValue.BustedMine);
        isMisplacedFlag && (cell.value = cellValue.IncorrectGuess);

        cell.state = cellState.Visible;
      });
    });

    return cloneDeep(state);
  }

  getMinesMarkedState(state) {
    return produce(state, draft => {
      draft.forEach(cell => {
        cell.isMined && (cell.state = cellState.Flagged);
      });
    });
  }

  _getFloodFilledState(state, address, draftFn) {
    return produce(state, draft => {
      // eslint-disable-next-line
      draftFn?.(draft);

      draft[address].state = cellState.Visible;

      const floodFill = a => {
        this._cellNeighborsUtils.canFloodFill(draft, a) && this._cellNeighborsUtils.getAddresses(a).forEach(addr => {
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
  }

  _getBustedState(state, draftFn) {
    return produce(state, draft => {
      draftFn(draft);

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
