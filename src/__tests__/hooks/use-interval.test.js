import React, { useState } from 'react';

import { render, screen, act } from '@testing-library/react'

import { useInterval } from 'hooks';

describe('useInterval', () => {
  const initialCount = 0;

  const MockComponent = ({ delay }) => {
    const [count, setCount] = useState(initialCount);

    useInterval(() => {
      setCount(count + 1);
    }, delay);

    return count;
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not run setInterval if delay is falsy value', () => {
    render(<MockComponent delay={null} />);

    expect(screen.getByText(`${initialCount}`)).toBeInTheDocument();
  });

  it('should run setInterval if delay is truthy value', () => {
    const delay = 500;
    const count = 3;

    render(<MockComponent delay={delay} />);

    act(() => {
      jest.advanceTimersByTime(delay * count);
    });

    expect(screen.getByText(`${count}`)).toBeInTheDocument();
  });
});
