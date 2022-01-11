import {
  memo,
  MouseEvent,
  useContext,
} from 'react';

import {
  EmptyCell,
  HiddenCell,
  MarkedCell,
  MinedCell,
  OpenedCell,
} from 'components/Cell';

import CellHandlers from 'contexts/cell-handlers';

export default memo(({
  mined,
  visible,
  busted,
  wrong,
  marked,
  highlighted,
  value,
  index,
}: Cell & {
  index: number;
}) => {
  const cellHandlers = useContext(CellHandlers);

  const toggleMark = (event: MouseEvent) => {
    cellHandlers.toggleMark(index, event);
  };

  const stopHighlightingNeighbors = () => {
    cellHandlers.stopHighlightingNeighbors(index);
  };

  if ((mined && visible) || busted || wrong) {
    return (
      <MinedCell
        busted={busted}
        wrong={wrong}
      />
    );
  }

  if (marked) {
    return (
      <MarkedCell
        marked={marked}
        onMouseDown={toggleMark}
      />
    );
  }

  if (!visible) {
    return (
      <HiddenCell
        highlighted={highlighted}
        onMouseDown={toggleMark}
        onMouseUp={(event) => {
          cellHandlers.openCell(index, event);
        }}
      />
    );
  }

  if (!value) {
    return <EmptyCell />;
  }

  return (
    <OpenedCell
      value={value}
      onMouseDown={(event) => {
        cellHandlers.handleNeighbors(index, event);
      }}
      onMouseLeave={stopHighlightingNeighbors}
      onMouseUp={stopHighlightingNeighbors}
    />
  );
});
