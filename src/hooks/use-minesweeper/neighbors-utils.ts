import {
  concat,
  difference,
  some,
  range,
  reduce,
} from 'lodash-es';

import PointUtils, {
  reducePoints,
} from './point-utils';

export default class {
  private width: number;
  private height: number;
  private pointUtils: PointUtils;

  constructor({
    width,
    height,
  }: Settings) {
    this.width = width;
    this.height = height;
    this.pointUtils = new PointUtils(width, height);
  }

  getIndexes = (index: number) => {
    const point = this.pointUtils.toPoint(index);
    const indexes = [];

    for (let x = -1; x < 2; ++x) {
      for (let y = -1; y < 2; ++y) {
        if (x || y) {
          const next = reducePoints(point, {
            x,
            y,
          });

          if (this.pointUtils.canConvertToIndex(next)) {
            indexes.push(this.pointUtils.toIndex(next));
          }
        }
      }
    }

    return indexes;
  };

  excludeIndexes = (index: number) =>
    difference(
      range(this.width * this.height),
      concat(this.getIndexes(index), index),
    );

  canFloodFill = (index: number, state: Minesweeper) =>
    !some(this.getIndexes(index), (x) => {
      const {
        mined,
        marked,
      } = state.field[x];

      return mined && !marked;
    });

  canOpen = (index: number, state: Minesweeper) =>
    this.countMines(index, state) === this.countBy(index, state, 'marked');

  countMines = (index: number, state: Minesweeper) =>
    this.countBy(index, state, 'mined');

  private countBy = (index: number, state: Minesweeper, key: keyof Cell) =>
    reduce(
      this.getIndexes(index),
      (acc, x) => state.field[x][key] ? acc + 1 : acc, 0,
    );
}
