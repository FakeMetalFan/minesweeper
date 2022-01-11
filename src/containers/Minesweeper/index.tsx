import CellHandlers from 'contexts/cell-handlers';

import useMinesweeper from 'hooks/use-minesweeper';
import useCellHandlers from 'hooks/use-cell-handlers';
import useEventHandler from 'hooks/use-event-handler';

import Indicators from '../Indicators';
import MineField from '../MineField';
import Settings from '../Settings';

export default () => {
  const minesweeper = useMinesweeper();

  const {
    settings,
    status,
    reset,
    field,
    changeSettings,
  } = minesweeper;

  useEventHandler('contextmenu', (event) => {
    event.preventDefault();
  });

  return (
    <>
      <Indicators
        settings={settings}
        status={status}
        onReset={reset}
      />
      <CellHandlers.Provider
        value={useCellHandlers(minesweeper)}
      >
        <MineField
          field={field}
          settings={settings}
          status={status}
        />
      </CellHandlers.Provider>
      <Settings
        settings={settings}
        onChange={changeSettings}
      />
    </>
  );
};
