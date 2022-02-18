import {
  useCallback,
  useReducer,
} from 'react';

import NeighborsUtils from './neighbors-utils';

import stateProducers from './state-producers';

enum ActionType {
  OpenCell,
  ToggleMark,
  OpenNeighbors,
  HighlightNeighbors,
  StopHighlightingNeighbors,
  ChangeSettings,
  Reset,
}

type Action =
  | {
      type: ActionType.OpenCell;
      payload: number;
    }
  | {
      type: ActionType.ToggleMark;
      payload: number;
    }
  | {
      type: ActionType.OpenNeighbors;
      payload: number;
    }
  | {
      type: ActionType.HighlightNeighbors;
      payload: number;
    }
  | {
      type: ActionType.StopHighlightingNeighbors;
      payload: number;
    }
  | {
      type: ActionType.ChangeSettings;
      payload: Settings;
    }
  | {
      type: ActionType.Reset;
    };

const reducer = (state: Minesweeper, action: Action) => {
  const {
    settings,
    status,
    field,
  } = state;

  switch (action.type) {
    case ActionType.OpenCell: {
      const {
        payload,
      } = action;
      const neighborsUtils = new NeighborsUtils(settings);

      if (!status.init) {
        return stateProducers.setupField(payload, neighborsUtils, state);
      }

      if (field[payload].mined) {
        return stateProducers.bustCell(payload, state);
      }

      return stateProducers.openCell(payload, neighborsUtils, state);
    }
    case ActionType.ToggleMark:
      return stateProducers.toggleMark(action.payload, state);
    case ActionType.OpenNeighbors: {
      const neighborsUtils = new NeighborsUtils(settings);
      const {
        canFloodFill,
        canOpen,
      } = neighborsUtils;
      const {
        payload,
      } = action;

      if (canFloodFill(payload, state)) {
        return stateProducers.openCell(payload, neighborsUtils, state);
      }

      if (canOpen(payload, state)) {
        return stateProducers.bustNeighbors(payload, neighborsUtils, state);
      }

      return stateProducers.stopHighlightingNeighbors(payload, state);
    }
    case ActionType.HighlightNeighbors:
      return stateProducers.highlightNeighbors(action.payload, state);
    case ActionType.StopHighlightingNeighbors:
      return stateProducers.stopHighlightingNeighbors(action.payload, state);
    case ActionType.ChangeSettings:
      return stateProducers.changeSettings(action.payload, state);
    case ActionType.Reset:
      return stateProducers.reset(state);
    default:
      throw 'Appropriate action must be implemented';
  }
};

export default (settings: Settings) => {
  const [
    state,
    dispatch,
  ] = useReducer(reducer, settings, stateProducers.initState);

  const openCell = (payload: number) => {
    dispatch({
      payload,
      type: ActionType.OpenCell,
    });
  };

  const toggleMark = (payload: number) => {
    dispatch({
      payload,
      type: ActionType.ToggleMark,
    });
  };

  const openNeighbors = (payload: number) => {
    dispatch({
      payload,
      type: ActionType.OpenNeighbors,
    });
  };

  const highlightNeighbors = (payload: number) => {
    dispatch({
      payload,
      type: ActionType.HighlightNeighbors,
    });
  };

  const stopHighlightingNeighbors = useCallback((payload: number) => {
    dispatch({
      payload,
      type: ActionType.StopHighlightingNeighbors,
    });
  }, []);

  const changeSettings = useCallback((payload: Settings) => {
    dispatch({
      payload,
      type: ActionType.ChangeSettings,
    });
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: ActionType.Reset,
    });
  }, []);

  return {
    ...state,
    openCell,
    toggleMark,
    openNeighbors,
    stopHighlightingNeighbors,
    highlightNeighbors,
    changeSettings,
    reset,
  };
};
