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

export default <I,>({
  items,
  Styles,
  renderRadioButton,
}: {
  items: I[];
  Styles?: StyledComponent<any, any>;
  renderRadioButton: (item: I) => JSX.Element;
}) =>
  createElement(
    Styles ?? Fragment,
    null,
    ...map(items, renderRadioButton),
  );
