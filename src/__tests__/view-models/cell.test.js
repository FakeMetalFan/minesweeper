import { CellVM } from 'view-models';

import { cellState, cellValue } from 'const';

describe('CellVM', () => {
  it('should be empty and hidden by default', () => {
    const { value, state } = new CellVM;

    expect(value).toBe(cellValue.Empty);
    expect(state).toBe(cellState.Hidden);
  });

  it(`should indicate mine's presence`, () => {
    expect(new CellVM().hasMine).toBe(false);
    expect(new CellVM(cellValue.Mine).hasMine).toBe(true);
  });

  it(`should indicate busted mine's presence`, () => {
    expect(new CellVM().hasBustedMine).toBe(false);
    expect(new CellVM(cellValue.BustedMine).hasBustedMine).toBe(true);
  });

  it(`should indicate incorrect guess`, () => {
    expect(new CellVM().hasGuessedIncorrectly).toBe(false);
    expect(new CellVM(cellValue.IncorrectGuess).hasGuessedIncorrectly).toBe(true);
  });

  it('should indicate emptiness', () => {
    expect(new CellVM().isEmpty).toBe(true);
    expect(new CellVM(cellValue.One).isEmpty).toBe(false);
  });

  it('should indicate visibility', () => {
    expect(new CellVM().isHidden).toBe(true);
    expect(new CellVM(cellValue.One, cellState.Visible).isHidden).toBe(false);
  });

  it(`should indicate flag's presence`, () => {
    expect(new CellVM().hasFlag).toBe(false);
    expect(new CellVM(cellValue.Mine, cellState.Flagged).hasFlag).toBe(true);
  });

  it(`should indicate flag's misplacing`, () => {
    expect(new CellVM().hasMisplacedFlag).toBe(false);
    expect(new CellVM(cellValue.One, cellState.Flagged).hasMisplacedFlag).toBe(true);
  });

  it(`should indicate mine's unrevealing`, () => {
    expect(new CellVM().hasUnrevealedMine).toBe(false);
    expect(new CellVM(cellValue.Mine, cellState.Hidden).hasUnrevealedMine).toBe(true);
  });
});
