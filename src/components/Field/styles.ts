import {
  lighten,
} from 'polished';

import styled, {
  css,
} from 'styled-components';

import {
  Props,
} from '.';

export default styled.div<Props<any>>`
  background-color: ${lighten(.3, '#000')};
  display: grid;
  grid-gap: 1px;
  margin: 4px auto 8px;
  padding: 1px;

  ${({
    width,
    height,
    cellSize,
  }) =>
    css`
      grid-template-columns: repeat(${width}, ${cellSize}px);
      grid-template-rows: repeat(${height}, ${cellSize}px);
    `
  }

  ${({
    disabled,
  }) => {
    if (disabled) {
      return css`
        pointer-events: none;
      `;
    }
  }}
`;
