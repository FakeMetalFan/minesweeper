import {
  darken,
  lighten,
} from 'polished';

import styled, {
  css,
} from 'styled-components';

import {
  BACKGROUND_COLOR,
} from 'styles';

const getCellBackgroundColor = (lightenAmount = 0) =>
  lighten(lightenAmount, BACKGROUND_COLOR);

const getRedColor = (darkenAmount = 0) =>
  darken(darkenAmount, '#ff0d72');

export const Default = styled.button`
  background-color: ${getCellBackgroundColor()};
  color: ${darken(.2, '#fff')};
  font: inherit;
  font-weight: bold;
  font-size: 14px;
`;

export const Empty = styled(Default)`
  background-color: ${getCellBackgroundColor(.1)};
`;

export const Hidden = styled(Default)<Pick<Cell, 'highlighted'>>`
  ${({
    highlighted,
  }) => {
    if (highlighted) {
      return css`
        background-color: ${getCellBackgroundColor(.3)};
      `;
    }
  }}
`;

export const Mined = styled(Default)<Pick<Cell, 'busted' | 'wrong'>>`
  background-color: ${getCellBackgroundColor(.1)};

  ${({
    busted,
  }) => {
    if (busted) {
      return css`
        background-color: ${getRedColor(.2)};
      `;
    }
  }}

  ${({
    wrong,
  }) => {
    if (wrong) {
      return css`
        position: relative;

        &::before,
        &::after {
          background: ${getRedColor(.2)};
          content: '';
          height: 100%;
          left: 11px;
          position: absolute;
          top: 0;
          width: 2px;
        }

        &::before {
          transform: rotate(-45deg);
        }

        &::after {
          transform: rotate(45deg);
        }
      `;
    }
  }}
`;

const getValueColor = (value: number) => {
  switch (value) {
    case 1:
      return '#0dc2ff';
    case 2:
      return '#0dff72';
    case 3:
      return getRedColor();
    case 4:
      return '#3877ff';
    case 5:
      return '#f538ff';
    case 6:
      return '#ffe138';
    case 7:
      return '#ff8e0d';
    case 8:
      return '#000';
  }
};

export const Opened = styled(Default)<Pick<Cell, 'value'>>`
  background-color: ${getCellBackgroundColor(.1)};

  ${({
    value,
  }) =>
    css`
      color: ${darken(.1, getValueColor(value)!)};
    `
  }
`;
