import React from 'react';

import { render, screen } from '@testing-library/react'

import { useField } from 'hooks';

import { cellValue } from 'const';

import { setupIcons } from 'setupIcons';

describe('useField', () => {
  const minesCount = 1;
  const fieldDimension = 4;

  beforeEach(() => {
    setupIcons();
  });

  it('should have empty state', () => {
    const MockComponent = () => {
      const { state } = useField({ minesCount, width: fieldDimension, height: fieldDimension });

      return <>{state.map(({ value }, address) => <div key={address}>{value}</div>)}</>;
    };

    render(<MockComponent />);

    expect(screen.getAllByText(`${cellValue.Empty}`).length).toBe(fieldDimension ** 2);
  });
});
