type Unique<O extends Record<string, unknown>> = O & {
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
  busted: boolean;
  init: boolean;
  hiddenMines: number;
  solved: boolean;
};

type Minesweeper = {
  field: Unique<Cell>[];
  settings: Settings;
  status: Status;
};
