import { immerable } from 'immer';

import { cellValue, cellState } from 'const';

export class CellVM {
  [immerable] = true;

  value;
  state;

  constructor(
    value = cellValue.Empty,
    state = cellState.Hidden
  ) {
    this.value = value;
    this.state = state;
  }

  get hasMine() {
    return this.value === cellValue.Mine;
  }

  get hasBustedMine() {
    return this.value === cellValue.BustedMine;
  }

  get hasGuessedIncorrectly() {
    return this.value === cellValue.IncorrectGuess;
  }

  get isEmpty() {
    return this.value === cellValue.Empty;
  }

  get isHidden() {
    return this.state === cellState.Hidden;
  }

  get hasFlag() {
    return this.state === cellState.Flagged;
  }

  get hasMisplacedFlag() {
    return !this.hasMine && this.hasFlag;
  }

  get hasUnrevealedMine() {
    return this.hasMine && !this.hasFlag;
  }
}
