import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import {
  StyledComponent,
} from 'styled-components';

import * as Styles from './styles';

type Props = {
  Styles?: StyledComponent<any, any>;
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
};

const Cell = (props: PropsWithChildren<Props>) => {
  const {
    onMouseDown,
    onMouseUp,
    Styles: Cell = Styles.Default,
    children,
  } = props;

  return (
    <Cell
      {...props}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </Cell>
  );
};

export const EmptyCell = () => (
  <Cell
    Styles={Styles.Empty}
  />
);

export const HiddenCell = (props: Props & Pick<Cell, 'highlighted'>) => (
  <Cell
    {...props}
    Styles={Styles.Hidden}
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
    Styles={Styles.Mined}
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
    Styles={Styles.Opened}
  >
    {props.value}
  </Cell>
);
