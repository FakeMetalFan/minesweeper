import { CellNeighborsUtils, CellVM } from 'view-models';

import { cellState, cellValue } from 'const';

describe('CellNeighborsUtils', () => {
  const fieldWidth = 3;
  const fieldHeight = 3;

  let cellNeighborsUtils;

  const to1DState = state => state.flat();
  const sortAddresses = addresses => addresses.sort((prev, next) => prev - next);

  beforeEach(() => {
    cellNeighborsUtils = new CellNeighborsUtils(fieldWidth, fieldHeight);
  });

  it('should indicate ability to flood fill', () => {
    const floodFillAbleState = to1DState([
      [new CellVM(cellValue.One), new CellVM(cellValue.One), new CellVM(cellValue.One)],
      [new CellVM(cellValue.One), new CellVM(cellValue.Mine, cellState.Flagged), new CellVM(cellValue.One)],
      [new CellVM(cellValue.One), new CellVM(cellValue.One), new CellVM(cellValue.One)],
    ]);

    expect(cellNeighborsUtils.canFloodFill(floodFillAbleState, 4)).toBe(true);

    const floodFillUnableState = to1DState([
      [new CellVM(cellValue.Mine), new CellVM(cellValue.One), new CellVM(cellValue.One)],
      [new CellVM(cellValue.One), new CellVM(cellValue.Mine, cellState.Flagged), new CellVM(cellValue.One)],
      [new CellVM(cellValue.One), new CellVM(cellValue.One), new CellVM(cellValue.One)],
    ]);

    expect(cellNeighborsUtils.canFloodFill(floodFillUnableState, 4)).toBe(false);
  });

  it('should return cell neighbors addresses', () => {
    expect(sortAddresses(cellNeighborsUtils.getAddresses(0))).toEqual([1, 3, 4]);
    expect(sortAddresses(cellNeighborsUtils.getAddresses(1))).toEqual([0, 2, 3, 4, 5]);
    expect(sortAddresses(cellNeighborsUtils.getAddresses(2))).toEqual([1, 4, 5]);

    expect(sortAddresses(cellNeighborsUtils.getAddresses(3))).toEqual([0, 1, 4, 6, 7]);
    expect(sortAddresses(cellNeighborsUtils.getAddresses(4))).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
    expect(sortAddresses(cellNeighborsUtils.getAddresses(5))).toEqual([1, 2, 4, 7, 8]);

    expect(sortAddresses(cellNeighborsUtils.getAddresses(6))).toEqual([3, 4, 7]);
    expect(sortAddresses(cellNeighborsUtils.getAddresses(7))).toEqual([3, 4, 5, 6, 8]);
    expect(sortAddresses(cellNeighborsUtils.getAddresses(8))).toEqual([4, 5, 7]);
  });

  it('should return mined cells count', () => {
    const state = to1DState([
      [new CellVM, new CellVM, new CellVM],
      [new CellVM, new CellVM, new CellVM(cellValue.Mine)],
      [new CellVM, new CellVM, new CellVM(cellValue.Mine)],
    ]);

    expect(cellNeighborsUtils.getMinedCount(state, 4)).toBe(2);
    expect(cellNeighborsUtils.getMinedCount(state, 5)).toBe(1);
    expect(cellNeighborsUtils.getMinedCount(state, 6)).toBe(0);
  });

  it('should indicate if neighbors could be revealed', () => {
    const minesRevealedState = to1DState([
      [new CellVM(cellValue.Mine), new CellVM, new CellVM],
      [new CellVM, new CellVM, new CellVM],
      [new CellVM, new CellVM, new CellVM(cellValue.Empty, cellState.Flagged)],
    ]);

    expect(cellNeighborsUtils.canRevealNeighbors(minesRevealedState, 4)).toBe(true);
  });
});
