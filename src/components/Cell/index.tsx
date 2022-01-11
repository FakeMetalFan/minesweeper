import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import {
  Default,
  Empty,
  Hidden,
  Mined,
  Opened,
} from './styles';

type Props = {
  Styles?: typeof Default;
  onMouseDown?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
};

const Cell = (props: PropsWithChildren<Props>) => {
  const {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    Styles = Default,
    children,
  } = props;

  return (
    <Styles
      {...props}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    >
      {children}
    </Styles>
  );
};

export const EmptyCell = () => (
  <Cell
    Styles={Empty}
  />
);

export const HiddenCell = (props: Props & Pick<Cell, 'highlighted'>) => (
  <Cell
    {...props}
    Styles={Hidden}
  />
);

export const MarkedCell = (props: Props & Pick<Cell, 'marked'>) => (
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

export const MinedCell = (props: Pick<Cell, 'wrong' | 'busted'>) => (
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

export const OpenedCell = (props: Props & Pick<Cell, 'value'>) => (
  <Cell
    {...props}
    Styles={Opened}
  >
    {props.value}
  </Cell>
);
