import { CellAddressUtils } from './cell-address-utils';

export class CellNeighborsUtils {
  constructor(
    fieldWidth,
    fieldHeight
  ) {
    this._fieldWidth = fieldWidth;
    this._fieldHeight = fieldHeight;
    this._cellAddressUtils = new CellAddressUtils(fieldWidth);
  }

  getNeighborsAddresses(address) {
    const [rowAddress, cellAddress] = this._cellAddressUtils.to2DAddresses(address);
    const addresses = [];

    for (let rowAddressOffset = -1; rowAddressOffset < 2; rowAddressOffset++)
      for (let cellAddressOffset = -1; cellAddressOffset < 2; cellAddressOffset++)
        if (rowAddressOffset || cellAddressOffset) {
          const rowAddressWithOffset = rowAddress + rowAddressOffset;
          const cellAddressWithOffset = cellAddress + cellAddressOffset;

          -1 < rowAddressWithOffset && rowAddressWithOffset < this._fieldWidth
            && -1 < cellAddressWithOffset && cellAddressWithOffset < this._fieldHeight
              && addresses.push(this._cellAddressUtils.to1DAddress(rowAddressWithOffset, cellAddressWithOffset));
        }

    return addresses;
  }

  countUnderminedNeighbors(state, address) {
    return this.getNeighborsAddresses(address).reduce((acc, addr) => state[addr].isUndermined ? acc + 1 : acc, 0);
  }
}
