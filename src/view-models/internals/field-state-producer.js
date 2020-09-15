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
    if (!this._isInit) {
      this._isInit = true;

      return this._getInitialState(state, address);
    }

    if (cell.isMined) return this._getBustedState(state, address);

    return this._getFloodFilledState(produce(state, draft => {
      draft[address].state = cellState.Visible;
    }), address);
  }

  getFlagPlantedState(state, { isFlagged }, address) {
    return produce(state, draft => {
      draft[address].state = cellState[isFlagged ? 'Hidden' : 'Flagged'];
    });
  }

  getNeighborsRevealedState(state, address) {
    if (this._cellNeighborsUtils.isFloodFillAble(state, address))
      return this._getFloodFilledState(state, address);

    return produce(state, draft => {
      if (this._cellNeighborsUtils.shouldRevealNeighbors(draft, address)) {
        this._cellNeighborsUtils.getNeighborsAddresses(address).forEach(addr => {
          const cell = draft[addr];
          const { isMined, isFlagged } = cell;

          !isMined && isFlagged && (cell.value = cellValue.IncorrectGuess);
          isMined && !isFlagged && (cell.value = cellValue.BustedMine);

          cell.state = cellState.Visible;
        });

        this._getHiddenMinesAddresses(draft).forEach(addr => {
          draft[addr].state = cellState.Visible;
        });
      }
    });
  }

  _getInitialState(state, excludedAddress) {
    return this._getFloodFilledState(this._getComputedState(state, excludedAddress), excludedAddress);
  }

  _getBustedState(state, address) {
    return produce(state, draft => {
      draft[address] = new Cell(cellValue.BustedMine, cellState.Visible);

      this._getHiddenMinesAddresses(draft).forEach(addr => {
        draft[addr].state = cellState.Visible;
      });
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
      draft.forEach(({ isMined }, addr) => {
        !isMined && (draft[addr].value = this._cellNeighborsUtils.countMinedNeighbors(draft, addr));
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

  _getHiddenMinesAddresses(state) {
    return state.reduce((acc, { isMined, isFlagged }, addr) => {
      isMined && !isFlagged && acc.push(addr);

      return acc;
    }, []);
  }

  get _length() {
    return this.width * this._height;
  }
}
