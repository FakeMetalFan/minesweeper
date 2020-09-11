import { fieldHeight, fieldType, fieldWidth, minesCount } from 'const';

import { Field } from './field';

export class FieldFactory {
  constructor(
    type
  ) {
    const smallField = new Field(fieldWidth.SM, fieldHeight.SM, minesCount.SM);

    switch (type) {
      case fieldType.SM:
        return smallField;
      case fieldType.MD:
        return new Field(fieldWidth.MD, fieldHeight.MD, minesCount.MD);
      case fieldType.BG:
        return new Field(fieldWidth.BG, fieldHeight.BG, minesCount.BG);
      default:
        return smallField;
    }
  }
}
