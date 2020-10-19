import { CellAddressUtils } from './cell-address-utils';

export class CellNeighborsUtils {
  _fieldWidth;
  _fieldHeight;
  _cellAddressUtils;

  constructor(
    fieldWidth,
    fieldHeight
  ) {
    this._fieldWidth = fieldWidth;
    this._fieldHeight = fieldHeight;
    this._cellAddressUtils = new CellAddressUtils(fieldWidth);
  }

  canFloodFill(state, address) {
    return !this.getAddresses(address).some(adr => state[adr].hasUnrevealedMine);
  }

  getAddresses(address) {
    const [rowAddress, colAddress] = this._cellAddressUtils.to2DAddresses(address);
    const addresses = [];

    for (let rowAddressOffset = -1; rowAddressOffset < 2; rowAddressOffset++)
      for (let colAddressOffset = -1; colAddressOffset < 2; colAddressOffset++)
        if (rowAddressOffset || colAddressOffset) {
          const rowAddressAhead = rowAddress + rowAddressOffset;
          const colAddressAhead = colAddress + colAddressOffset;

          this._doesAddressExist(rowAddressAhead, this._fieldWidth)
            && this._doesAddressExist(colAddressAhead, this._fieldHeight)
              && addresses.push(this._cellAddressUtils.to1DAddress(rowAddressAhead, colAddressAhead));
        }

    return addresses;
  }

  getMinedCount(state, address) {
    return this._getCountBy(state, address, 'hasMine');
  }

  canRevealNeighbors(state, address) {
    return this.getMinedCount(state, address) === this._getCountBy(state, address, 'hasFlag');
  }

  _getCountBy(state, address, propName) {
    return this.getAddresses(address).reduce((ac, adr) => state[adr][propName] ? ac + 1 : ac, 0);
  }

  _doesAddressExist(address, criteria) {
    return -1 < address && address < criteria;
  }
}
