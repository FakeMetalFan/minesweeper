import { CellAddressUtils } from 'view-models';

describe('CellAddressUtils', () => {
  const fieldWidth = 3;

  let cellAddressUtils;

  beforeEach(() => {
    cellAddressUtils = new CellAddressUtils(fieldWidth);
  });

  it('should convert 1D cell address to 2D address', () => {
    expect(cellAddressUtils.to2DAddresses(0)).toEqual([0, 0]);
    expect(cellAddressUtils.to2DAddresses(fieldWidth ** 2 / 2 | 0)).toEqual([1, 1]);
    expect(cellAddressUtils.to2DAddresses(fieldWidth ** 2 - 1)).toEqual([2, 2]);
  });

  it('should convert 2D cell address to 1D address', () => {
    expect(cellAddressUtils.to1DAddress(0, 0)).toBe(0);
    expect(cellAddressUtils.to1DAddress(1, 1)).toBe(fieldWidth ** 2 / 2 | 0);
    expect(cellAddressUtils.to1DAddress(2, 2)).toBe(fieldWidth ** 2 - 1);
  });
});
