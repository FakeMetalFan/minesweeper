import produce from 'immer';

import {
  assign,
  each,
  flow,
  map,
  partial,
  sample,
  toArray,
} from 'lodash-es';

import makeUnique from 'utils/make-unique';

import {
  INITIAL_CELL_STATE,
} from './constants';

import NeighborsUtils from './neighbors-utils';

import {
  solved,
} from './utils';

const initCell = () =>
  makeUnique(INITIAL_CELL_STATE);

const markMines = (state: Minesweeper) =>
  produce(state, (draft) => {
    each(draft.field, (cell) => {
      if (cell.mined) {
        cell.marked = true;
      }
    });
  });

const _bustCell = (index: number, state: Minesweeper) =>
  produce(state, (draft) => {
    draft.field[index].busted = true;
  });

const revealMines = (state: Minesweeper) =>
  produce(state, (draft) => {
    each(draft.field, (cell) => {
      const {
        mined,
        busted,
        marked,
      } = cell;

      if (!mined && marked) {
        cell.wrong = true;

        return;
      }

      if (mined && !busted && !marked) {
        cell.visible = true;
      }
    });
  });

const setStatusValue = <T extends keyof Status>(
  key: T,
  value: Status[T],
  state: Minesweeper,
) =>
  produce(state, (draft) => {
    draft.status[key] = value;
  });

const _bustNeighbors = (
  index: number,
  neighborsUtils: NeighborsUtils,
  state: Minesweeper,
) =>
  produce(state, (draft) => {
    each(neighborsUtils.getIndexes(index), (x) => {
      const cell = draft.field[x];
      const {
        mined,
        marked,
      } = cell;

      if (mined && !marked) {
        cell.busted = true;

        return;
      }

      if (!mined && !marked) {
        cell.visible = true;
      }
    });
  });

const initField = ({
  width,
  height,
}: Settings) =>
  map(
    toArray({
      length: width * height,
    }),
    initCell,
  );

const initStatus = (settings: Settings) => ({
  hiddenMines: settings.mines,
  init: false,
  solved: false,
  busted: false,
});

const floodFill = (index: number, {
  canFloodFill,
  getIndexes,
}: NeighborsUtils, state: Minesweeper) =>
  produce(state, ({
    field,
  }) => {
    field[index].visible = true;

    const floodFillNeighbors = (x: number) => {
      if (canFloodFill(x, state)) {
        each(getIndexes(x), (dx) => {
          const cell = field[dx];
          const {
            mined,
            visible,
            marked,
          } = cell;

          if (!mined && !visible && !marked) {
            cell.visible = true;

            floodFillNeighbors(dx);
          }
        });
      }
    };

    floodFillNeighbors(index);
  });

const checkSolve = (state: Minesweeper) =>
  solved(state) ? flow(
    markMines,
    partial(setStatusValue, 'solved', true),
  )(state) : state;

const plantMines = (index: number, {
  excludeIndexes,
  countMines,
}: NeighborsUtils, state: Minesweeper) =>
  produce(state, (draft) => {
    const indexes = excludeIndexes(index);
    const minedIndexes = new Set<number>();

    while (minedIndexes.size < state.settings.mines) {
      minedIndexes.add(sample(indexes)!);
    }

    const {
      field,
    } = draft;

    minedIndexes.forEach((x) => {
      field[x].mined = true;
    });

    each(field, (cell, x) => {
      if (!cell.mined) {
        cell.value = countMines(x, draft);
      }
    });
  });

const _toggleMark = (index: number, state: Minesweeper) =>
  produce(state, (draft) => {
    const cell = draft.field[index];

    cell.marked = !cell.marked;
  });

const bustCell = (index: number, state: Minesweeper) =>
  flow(
    partial(_bustCell, index),
    revealMines,
    partial(setStatusValue, 'busted', true),
  )(state);

const bustNeighbors = (
  index: number,
  neighborsUtils: NeighborsUtils,
  state: Minesweeper,
) =>
  flow(
    revealMines,
    partial(_bustNeighbors, index, neighborsUtils),
    partial(setStatusValue, 'busted', true),
  )(state);

const changeSettings = (settings: Settings, state: Minesweeper) =>
  produce(state, (draft) => {
    assign(draft, initState(settings));
  });

const highlightNeighbors = (index: number, state: Minesweeper) =>
  produce(state, (draft) => {
    each(new NeighborsUtils(state.settings).getIndexes(index), (x) => {
      const cell = draft.field[x];
      const {
        marked,
        visible,
      } = cell;

      if (!marked && !visible) {
        cell.highlighted = true;
      }
    });
  });

const initState = (settings: Settings) => ({
  settings,
  field: initField(settings),
  status: initStatus(settings),
});

const openCell = (
  index: number,
  neighborsUtils: NeighborsUtils,
  state: Minesweeper,
) =>
  flow(
    partial(floodFill, index, neighborsUtils),
    checkSolve,
    (next) =>
      next.status.solved ? setStatusValue('hiddenMines', 0, next) : next,
  )(state);

const reset = (state: Minesweeper) =>
  produce(state, ({
    status,
    settings,
    field,
  }) => {
    assign(status, initState(settings).status);
    each(field, (cell) => {
      assign(cell, INITIAL_CELL_STATE);
    });
  });

const setupField = (
  index: number,
  neighborsUtils: NeighborsUtils,
  state: Minesweeper
) =>
  flow(
    partial(plantMines, index, neighborsUtils),
    partial(floodFill, index, neighborsUtils),
    partial(setStatusValue, 'init', true),
  )(state);

const stopHighlightingNeighbors = (index: number, state: Minesweeper) =>
  produce(state, (draft) => {
    each(new NeighborsUtils(state.settings).getIndexes(index), (x) => {
      draft.field[x].highlighted = false;
    });
  });

const toggleMark = (index: number, state: Minesweeper) =>
  flow(
    partial(_toggleMark, index),
    (next) => {
      const {
        status,
        field,
      } = next;

      return setStatusValue(
        'hiddenMines',
        status.hiddenMines + (field[index].marked ? -1 : 1),
        next,
      );
    },
  )(state);

export default {
  bustCell,
  bustNeighbors,
  changeSettings,
  highlightNeighbors,
  initState,
  openCell,
  reset,
  setupField,
  stopHighlightingNeighbors,
  toggleMark,
};
