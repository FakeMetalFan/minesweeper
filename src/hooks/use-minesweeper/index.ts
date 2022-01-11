import {
  partial,
} from 'lodash-es';

import {
  useCallback,
  useState,
} from 'react';

import NeighborsUtils from './neighbors-utils';

import stateProducers from './state-producers';

export default () => {
  const [
    state,
    setState,
  ] = useState(stateProducers.initState);

  const openCell = (index: number) => {
    setState((prev) => {
      const {
        settings,
        status,
        field,
      } = prev;
      const neighborsUtils = new NeighborsUtils(settings);

      if (!status.init) {
        return stateProducers.setupField(index, neighborsUtils, prev);
      }

      if (field[index].mined) {
        return stateProducers.bustCell(index, prev);
      }

      return stateProducers.open(index, neighborsUtils, prev);
    });
  };

  const toggleMark = (index: number) => {
    setState(partial(stateProducers.toggleMark, index));
  };

  const openNeighbors = (index: number) => {
    setState((prev) => {
      const neighborsUtils = new NeighborsUtils(prev.settings);
      const {
        canFloodFill,
        canOpen,
      } = neighborsUtils;

      if (canFloodFill(index, prev)) {
        return stateProducers.open(index, neighborsUtils, prev);
      }

      if (canOpen(index, prev)) {
        return stateProducers.bustNeighbors(index, neighborsUtils, prev);
      }

      return stateProducers.stopHighlightingNeighbors(index, prev);
    });
  };

  const highlightNeighbors = (index: number) => {
    setState(partial(stateProducers.highlightNeighbors, index));
  };

  const stopHighlightingNeighbors = useCallback((index: number) => {
    setState(partial(stateProducers.stopHighlightingNeighbors, index));
  }, []);

  const changeSettings = useCallback((settings: Settings) => {
    setState(partial(stateProducers.changeSettings, settings));
  }, []);

  const reset = useCallback(() => {
    setState(partial(stateProducers.reset));
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
