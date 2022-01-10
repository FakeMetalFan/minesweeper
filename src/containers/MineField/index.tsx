import Field from 'components/Field';

import useCellHandlers from 'hooks/use-cell-handlers';

import CellFactory from '../CellFactory';

export default ({
  field,
  settings,
  status,
  cellHandlers,
}: Minesweeper & {
  cellHandlers: ReturnType<typeof useCellHandlers>;
}) => {
  const {
    width,
    height,
  } = settings;

  const {
    solved,
    busted,
  } = status;

  return (
    <Field
      field={field}
      width={width}
      height={height}
      cellSize={24}
      disabled={solved || busted}
      renderCell={
        (cell: Cell, index: number) => (
          <CellFactory
            {...cell}
            {...cellHandlers}
            index={index}
            key={cell.id}
          />
        )
      }
    />
  );
};
