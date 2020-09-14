import { cellValue, cellState } from 'const';

export class Cell {
  constructor(
    value = cellValue.Empty,
    state = cellState.Hidden
  ) {
    this.value = value;
    this.state = state;
  }

  get isMined() {
    return this.value === cellValue.Mine;
  }

  get isEmpty() {
    return this.value === cellValue.Empty;
  }

  get isHidden() {
    return this.state === cellState.Hidden;
  }

  get isFlagged() {
    return this.state === cellState.Flagged;
  }
}
