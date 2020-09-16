import { fieldHeight, fieldProducerType, fieldWidth, minesCount } from 'const';

import { FieldProducer } from './internals/field-producer';

export class FieldProducerFactory {
  constructor(
    type
  ) {
    const smallFieldProducer = new FieldProducer(fieldWidth.SM, fieldHeight.SM, minesCount.SM);

    switch (type) {
      case fieldProducerType.SM:
        return smallFieldProducer;
      case fieldProducerType.MD:
        return new FieldProducer(fieldWidth.MD, fieldHeight.MD, minesCount.MD);
      case fieldProducerType.BG:
        return new FieldProducer(fieldWidth.BG, fieldHeight.BG, minesCount.BG);
      default:
        return smallFieldProducer;
    }
  }
}
