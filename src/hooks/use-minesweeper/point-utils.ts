import {
  reduce
} from 'lodash-es';

type Point = {
  x: number;
  y: number;
};

export const reducePoints = (...points: Point[]) =>
  reduce(points, (acc, {
    x,
    y,
  }) => {
    acc.x += x;
    acc.y += y;

    return acc;
  }, {
    x: 0,
    y: 0,
  });

export default class {
  constructor(private width: number, private height: number) {}

  convert = (index: number) => {
    const x = index % this.width;

    return {
      x,
      y: (index - x) / this.width,
    };
  };

  toIndex = ({
    x,
    y,
  }: Point) => x + y * this.width;

  canConvertToIndex = ({
    x,
    y,
  }: Point) => (-1 < x && x < this.width) && (-1 < y && y < this.height);
}
