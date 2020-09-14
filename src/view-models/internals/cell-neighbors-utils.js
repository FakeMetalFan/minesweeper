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

          this._doesAddressExist(rowAddressWithOffset, this._fieldWidth)
            && this._doesAddressExist(cellAddressWithOffset, this._fieldHeight)
              && addresses.push(this._cellAddressUtils.to1DAddress(rowAddressWithOffset, cellAddressWithOffset));
        }

    return addresses;
  }

  countMinedNeighbors(state, address) {
    return this.getNeighborsAddresses(address).reduce((acc, addr) => state[addr].isMined ? acc + 1 : acc, 0);
  }

  isMinedNeighborsRevealed(state, address) {
    return this.countMinedNeighbors(state, address) <= this._countFlaggedNeighbors(state, address);
  }

  _countFlaggedNeighbors(state, address) {
    return this.getNeighborsAddresses(address).reduce((acc, addr) => state[addr].isFlagged ? acc + 1 : acc, 0);
  }

  _doesAddressExist(address, criteria) {
    return -1 < address && address < criteria;
  }
}
