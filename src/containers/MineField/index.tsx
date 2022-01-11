import Field from 'components/Field';

import CellFactory from '../CellFactory';

export default ({
  field,
  settings,
  status,
}: Minesweeper) => {
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
        (cell, index) => (
          <CellFactory
            {...cell}
            index={index}
            key={cell.id}
          />
        )
      }
    />
  );
};
