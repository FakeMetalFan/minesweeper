import {
  some
} from 'lodash-es';

export const solved = (state: Minesweeper) =>
  !some(state.field, ({
    mined,
    visible,
  }) => !(mined || visible));
