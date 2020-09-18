import { fieldHeight, fieldProducerType, fieldWidth, minesCount } from 'const';

import { FieldProducer } from './internals/field-producer';

export class FieldProducerFactory {
  constructor(
    type
  ) {
    switch (type) {
      case fieldProducerType.SM:
        return new FieldProducer(fieldWidth.SM, fieldHeight.SM, minesCount.SM);
      case fieldProducerType.MD:
        return new FieldProducer(fieldWidth.MD, fieldHeight.MD, minesCount.MD);
      case fieldProducerType.BG:
        return new FieldProducer(fieldWidth.BG, fieldHeight.BG, minesCount.BG);
      default:
        throw new Error(`FieldProducer of type "${type}" does not exist!`);
    }
  }
}
