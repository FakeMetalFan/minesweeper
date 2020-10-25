import React, { useState } from 'react';

import { render, screen } from '@testing-library/react'

import { useDidUpdate } from 'hooks';

describe('useDidUpdate', () => {
  const MockComponent = ({ str }) => {
    const [text, setText] = useState(str);

    useDidUpdate(() => {
      setText(str);
    }, str);

    return text;
  };

  const value = 'value';

  it('should not fire when component mounts', () => {
    render(<MockComponent str={value} />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('should fire when component updates', () => {
    const { rerender } = render(<MockComponent str={value} />);
    const newValue = 'new-value';

    rerender(<MockComponent str={newValue} />);

    expect(screen.getByText(newValue)).toBeInTheDocument();
  });
});
