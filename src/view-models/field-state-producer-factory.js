import { fieldHeight, fieldStateProducerType, fieldWidth, minesCount } from 'const';

import { FieldStateProducer } from './internals/field-state-producer';

export class FieldStateProducerFactory {
  constructor(
    type
  ) {
    const smallFieldStateProducer = new FieldStateProducer(fieldWidth.SM, fieldHeight.SM, minesCount.SM);

    switch (type) {
      case fieldStateProducerType.SM:
        return smallFieldStateProducer;
      case fieldStateProducerType.MD:
        return new FieldStateProducer(fieldWidth.MD, fieldHeight.MD, minesCount.MD);
      case fieldStateProducerType.BG:
        return new FieldStateProducer(fieldWidth.BG, fieldHeight.BG, minesCount.BG);
      default:
        return smallFieldStateProducer;
    }
  }
}
