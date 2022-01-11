import {
  MouseEvent as ReactMouseEvent,
  useMemo,
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
  const openCell = (index: number, event: ReactMouseEvent) => {
    if (event.button === MOUSE_BUTTON.LEFT) {
      minesweeper.openCell(index);
    }
  };

  const toggleMark = (index: number, event: ReactMouseEvent) => {
    if (event.button === MOUSE_BUTTON.RIGHT) {
      minesweeper.toggleMark(index);
    }
  };

  const handleNeighbors = (index: number, {
    button,
    target,
  }: ReactMouseEvent) => {
    const handleMouseDown = (event: Event) => {
      if (canHandleNeighbors(button, (event as MouseEvent).button)) {
        minesweeper.highlightNeighbors(index);
      }

      target.removeEventListener('mousedown', handleMouseDown);
    };

    const handleMouseLeave = (event: Event) => {
      if (canHandleNeighbors(button, (event as MouseEvent).button)) {
        minesweeper.stopHighlightingNeighbors(index);
      }

      target.removeEventListener('mousedown', handleMouseDown);
      target.removeEventListener('mouseleave', handleMouseLeave);
      target.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = (event: Event) => {
      if (canHandleNeighbors(button, (event as MouseEvent).button)) {
        minesweeper.openNeighbors(index);
      }

      target.removeEventListener('mousedown', handleMouseDown);
      target.removeEventListener('mouseup', handleMouseUp);
    };

    target.addEventListener('mousedown', handleMouseDown);
    target.addEventListener('mouseleave', handleMouseLeave);
    target.addEventListener('mouseup', handleMouseUp);
  };

  return useMemo(() => ({
    openCell,
    toggleMark,
    handleNeighbors,
  }), []);
};
