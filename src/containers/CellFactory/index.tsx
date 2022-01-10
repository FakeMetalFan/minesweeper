import {
  memo,
} from 'react';

import {
  EmptyCell,
  HiddenCell,
  MarkedCell,
  MinedCell,
  MouseEventHandler,
  OpenedCell,
  Props,
} from 'components/Cell';

export default memo((props: Cell & Props & {
  openCell?: MouseEventHandler;
  toggleMark?: MouseEventHandler;
  handleNeighbors?: MouseEventHandler;
  stopHighlightingNeighbors?: MouseEventHandler;
}) => {
  const {
    mined,
    visible,
    busted,
    wrong,
    marked,
    toggleMark,
    highlighted,
    openCell,
    value,
    handleNeighbors,
    stopHighlightingNeighbors,
    ...rest
  } = props;

  if ((mined && visible) || busted || wrong) {
    return (
      <MinedCell
        {...rest}
        busted={busted}
        wrong={wrong}
      />
    );
  }

  if (marked) {
    return (
      <MarkedCell
        {...rest}
        marked={marked}
        onMouseDown={toggleMark}
      />
    );
  }

  if (!visible) {
    return (
      <HiddenCell
        {...rest}
        highlighted={highlighted}
        onMouseDown={toggleMark}
        onMouseUp={openCell}
      />
    );
  }

  if (!value) {
    return (
      <EmptyCell
        {...rest}
      />
    );
  }

  return (
    <OpenedCell
      {...rest}
      value={value}
      onMouseDown={handleNeighbors}
      onMouseLeave={stopHighlightingNeighbors}
      onMouseUp={stopHighlightingNeighbors}
    />
  );
});
