import React from 'react';

import { render } from '@testing-library/react'

import { useDidUpdate } from 'hooks';

describe('useDidUpdate', () => {
  const fn = jest.fn();

  const MockComponent = ({ prop }) => {
    useDidUpdate(fn, prop);

    return null;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not fire when component mounts', () => {
    render(<MockComponent prop={1} />);

    expect(fn).not.toHaveBeenCalled();
  });

  it('should fire when component updates', () => {
    const { rerender } = render(<MockComponent prop={1} />);

    rerender(<MockComponent prop={2} />);

    expect(fn).toHaveBeenCalled();
  });
});
