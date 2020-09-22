import produce from 'immer';

import range from 'lodash/range';
import difference from 'lodash/difference';

import { cellValue, cellState } from 'const';

import { Cell, CellNeighborsUtils } from './internals';

export class FieldProducer {
  state = [];

  constructor(
    width,
    height,
    minesCount
  ) {
    this._width = width;
    this._height = height;
    this._minesCount = minesCount;
    this._cellNeighborsUtils = new CellNeighborsUtils(width, height);
  }

  setEmptyState() {
    this.state = Array.from({ length: this._length }, () => new Cell());
  }

  setInitialState(address) {
    this.state = this._getFloodFilledState(address, draft => {
      const addresses = difference(range(this._length), [address, ...this._cellNeighborsUtils.getAddresses(address)]);
      const randomAddresses = new Set();

      while (randomAddresses.size < this._minesCount)
        randomAddresses.add(addresses[Math.random() * addresses.length | 0]);

      randomAddresses.forEach(addr => {
        draft[addr].value = cellValue.Mine;
      });

      draft.forEach((cell, addr) => {
        !cell.isMined && (cell.value = this._cellNeighborsUtils.getMinedCount(draft, addr));
      });
    });
  }

  setCellRevealedState({ isMined }, address) {
    this.state = isMined ? this._getBustedState(draft => {
      draft[address] = new Cell(cellValue.BustedMine, cellState.Visible);
    }) : this._getFloodFilledState(address);
  }

  setFlagPlantedState({ isFlagged }, address) {
    this.state = produce(this.state, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    });
  }

  setNeighborsRevealedState(addr) {
    if (this._cellNeighborsUtils.canFloodFill(this.state, addr)) this.state = this._getFloodFilledState(addr);
    else if (this._cellNeighborsUtils.canRevealNeighbors(this.state, addr)) this.state = this._getBustedState(draft => {
      this._cellNeighborsUtils.getAddresses(addr).forEach(address => {
        const cell = draft[address];
        const { isUnrevealedMine, isMisplacedFlag } = cell;

        isUnrevealedMine && (cell.value = cellValue.BustedMine);
        isMisplacedFlag && (cell.value = cellValue.IncorrectGuess);

        cell.state = cellState.Visible;
      });
    });
  }

  setMinesMarkedState() {
    this.state = produce(this.state, draft => {
      draft.forEach(cell => {
        cell.isMined && (cell.state = cellState.Flagged);
      });
    });
  }

  _getFloodFilledState(address, draftFn) {
    return produce(this.state, draft => {
      // eslint-disable-next-line
      draftFn?.(draft);

      draft[address].state = cellState.Visible;

      const floodFill = cellAddr => {
        this._cellNeighborsUtils.canFloodFill(draft, cellAddr)
          && this._cellNeighborsUtils.getAddresses(cellAddr).forEach(addr => {
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

  _getBustedState(draftFn) {
    return produce(this.state, draft => {
      draftFn(draft);

      draft.forEach((cell, addr) => {
        const { isUnrevealedMine, isMisplacedFlag } = cell;

        isUnrevealedMine && (cell.state = cellState.Visible);
        isMisplacedFlag && (draft[addr] = new Cell(cellValue.IncorrectGuess, cellState.Visible));
      });
    });
  }

  get _length() {
    return this._width * this._height;
  }
}
