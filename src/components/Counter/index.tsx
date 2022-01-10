import {
  createElement,
  Fragment,
  memo,
} from 'react';

import {
  StyledComponent,
} from 'styled-components';

export default memo(({
  count,
  min = 0,
  max = 999,
  leadingZerosCount = 3,
  Styles,
}: {
  count: number;
  min?: number;
  max?: number;
  leadingZerosCount?: number;
  Styles?: StyledComponent<any, any>;
}) =>
  createElement(
    Styles ?? Fragment,
    null,
    Math.min(max, Math.max(min, count))
      .toString()
      .padStart(leadingZerosCount, '0'),
  ),
);
