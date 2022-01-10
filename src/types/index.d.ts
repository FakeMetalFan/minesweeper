type Cell = {
  id: string;
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
  field: Cell[];
  settings: Settings;
  status: Status;
};
