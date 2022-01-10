import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import {
  MouseEvent,
  PropsWithChildren,
} from 'react';

import {
  Default,
  Empty,
  Hidden,
  Mined,
  Opened,
} from './styles';

export type MouseEventHandler = (index: number, event: MouseEvent) => void;

export type Props = {
  index: number;
  Styles?: typeof Default;
};

export type PropsWithHandlers = Props & {
  onMouseDown?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
};

const Cell = (props: PropsWithChildren<PropsWithHandlers>) => {
  const {
    onMouseDown,
    index,
    onMouseLeave,
    onMouseUp,
    Styles = Default,
    children,
  } = props;

  return (
    <Styles
      {...props}
      onMouseDown={
        onMouseDown && ((event) => {
          onMouseDown?.(index, event);
        })
      }
      onMouseLeave={
        onMouseLeave && ((event) => {
          onMouseLeave?.(index, event);
        })
      }
      onMouseUp={
        onMouseUp && ((event) => {
          onMouseUp?.(index, event);
        })
      }
    >
      {children}
    </Styles>
  );
};

export const EmptyCell = (props: Props) => (
  <Cell
    {...props}
    Styles={Empty}
  />
);

export type HiddenCellProps = PropsWithHandlers & Pick<Cell, 'highlighted'>;

export const HiddenCell = (props: HiddenCellProps) => (
  <Cell
    {...props}
    Styles={Hidden}
  />
);

export const MarkedCell = (props: PropsWithHandlers & Pick<Cell, 'marked'>) => (
  <Cell
    {...props}
  >
    <FontAwesomeIcon
      icon={
        [
          'fas',
          'flag',
        ]
      }
    />
  </Cell>
);

export type MinedCellProps = Props & Pick<Cell, 'wrong' | 'busted'>;

export const MinedCell = (props: MinedCellProps) => (
  <Cell
    {...props}
    Styles={Mined}
  >
    <FontAwesomeIcon
      icon={
        [
          'fas',
          'bomb',
        ]
      }
    />
  </Cell>
);

export type OpenedCellProps = PropsWithHandlers & Pick<Cell, 'value'>;

export const OpenedCell = (props: OpenedCellProps) => (
  <Cell
    {...props}
    Styles={Opened}
  >
    {props.value}
  </Cell>
);
