import {
  useCallback,
} from 'react';

import MOUSE_BUTTON from 'constants/mouse-button';

import useMinesweeper from './use-minesweeper';

const canHandleNeighbors = (prev: MOUSE_BUTTON, next: MOUSE_BUTTON) => {
  const allowedButtons = new Set([
    MOUSE_BUTTON.LEFT,
    MOUSE_BUTTON.RIGHT,
  ]);

  return allowedButtons.has(prev) && allowedButtons.has(next) && prev !== next;
};

export default (minesweeper: ReturnType<typeof useMinesweeper>) => {
  const openCell = useCallback((index, event) => {
    if (event.button === MOUSE_BUTTON.LEFT) {
      minesweeper.openCell(index);
    }
  }, []);

  const toggleMark = useCallback((index, event) => {
    if (event.button === MOUSE_BUTTON.RIGHT) {
      minesweeper.toggleMark(index);
    }
  }, []);

  const handleNeighbors = useCallback((index, {
    button,
    target,
  }) => {
    const handleMouseDown = (event: Event) => {
      if (canHandleNeighbors(button, (event as MouseEvent).button)) {
        minesweeper.highlightNeighbors(index);
      }

      target.removeEventListener('mousedown', handleMouseDown);
    };

    const handleMouseUp = (event: Event) => {
      if (canHandleNeighbors(button, (event as MouseEvent).button)) {
        minesweeper.openNeighbors(index);
      }

      target.removeEventListener('mousedown', handleMouseDown);
      target.removeEventListener('mouseup', handleMouseUp);
    };

    target.addEventListener('mousedown', handleMouseDown);
    target.addEventListener('mouseup', handleMouseUp);
  }, []);

  return {
    openCell,
    toggleMark,
    handleNeighbors,
    stopHighlightingNeighbors: minesweeper.stopHighlightingNeighbors,
  };
};
