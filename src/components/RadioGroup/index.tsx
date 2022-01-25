import {
  map,
} from 'lodash-es';

import {
  createElement,
  Fragment,
} from 'react';

import {
  StyledComponent,
} from 'styled-components';

export default <T,>({
  items,
  Styles,
  renderRadioButton,
}: {
  items: T[];
  Styles?: StyledComponent<any, any>;
  renderRadioButton: (item: T) => JSX.Element;
}) =>
  createElement(
    Styles ?? Fragment,
    null,
    ...map(items, renderRadioButton),
  );
