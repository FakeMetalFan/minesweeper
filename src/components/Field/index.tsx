import {
  map,
} from 'lodash-es';

import Styles from './styles';

export type Props<T> = {
  field: T[];
  width: number;
  height: number;
  cellSize: number;
  disabled?: boolean;
  renderCell: (cell: T, index: number) => JSX.Element;
};

export default <T,>(props: Props<T>) => {
  const {
    field,
    renderCell,
  } = props;

  return (
    <Styles
      {...props}
    >
      {map(field, renderCell)}
    </Styles>
  );
};
