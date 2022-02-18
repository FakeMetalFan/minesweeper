export const DEFAULT_SETTINGS = {
  label: 'Easy',
  width: 9,
  height: 9,
  mines: 10,
};

export default [
  DEFAULT_SETTINGS,
  {
    label: 'Medium',
    width: 16,
    height: 16,
    mines: 40,
  },
  {
    label: 'Hard',
    width: 30,
    height: 16,
    mines: 99,
  },
];
