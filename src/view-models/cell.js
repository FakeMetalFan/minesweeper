import { cellState, cellValue } from 'const';

export class Cell {
  constructor(
    value = cellValue.Empty,
    state = cellState.Hidden
  ) {
    this.value = value;
    this.state = state;
  }

  get isUndermined() {
    return this.value === cellValue.Mine;
  }

  get isEmpty() {
    return this.value === cellValue.Empty;
  }

  get isVisible() {
    return this.state === cellState.Visible;
  }
}
