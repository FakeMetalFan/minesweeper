type Unique<T extends Record<string, unknown>> = T & {
  id: string;
};

type Cell = {
  value: number;
  mined: boolean;
  visible: boolean;
  marked: boolean;
  wrong: boolean;
  busted: boolean;
  highlighted: boolean;
};

type Settings = {
  label: string;
  width: number;
  height: number;
  mines: number;
};

type Status = {
  hiddenMines: number;
  init: boolean;
  solved: boolean;
  busted: boolean;
};

type Minesweeper = {
  field: Unique<Cell>[];
  settings: Settings;
  status: Status;
};
