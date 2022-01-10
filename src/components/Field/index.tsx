import {
  map,
} from 'lodash-es';

import Styles from './styles';

export type Props<C> = {
  field: C[];
  width: number;
  height: number;
  cellSize: number;
  disabled?: boolean;
  renderCell: (cell: C, index: number) => JSX.Element;
};

export default <C,>(props: Props<C>) => {
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
