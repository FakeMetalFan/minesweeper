import { cellValue, cellVisibility } from 'const';

export class CellState {
  constructor(
    value = cellValue.Empty,
    visibility = cellVisibility.Hidden
  ) {
    this.value = value;

    this._visibility = visibility;
  }

  get isUndermined() {
    return this.value === cellValue.Mine;
  }

  get isNotUndermined() {
    return this.value !== cellValue.Mine;
  }

  get isEmpty() {
    return this.value === cellValue.Empty;
  }

  get isHidden() {
    return this._visibility === cellVisibility.Hidden;
  }

  get isVisible() {
    return this._visibility === cellVisibility.Visible;
  }
}
