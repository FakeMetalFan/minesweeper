import {
  createContext,
} from 'react';

import useCellHandlers from 'hooks/use-cell-handlers';

export default createContext<ReturnType<typeof useCellHandlers>>({
  openCell: () => {},
  toggleMark: () => {},
  handleNeighbors: () => {},
  stopHighlightingNeighbors: () => {},
});
