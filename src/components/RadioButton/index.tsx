import {
  createElement,
  Fragment,
  memo,
} from 'react';

import {
  StyledComponent,
} from 'styled-components';

const RadioButton = <T,>({
  item,
  label,
  checked,
  Styles,
  onChange,
}: {
  item: T;
  label: string;
  checked?: boolean;
  Styles?: StyledComponent<any, any>;
  onChange?: (item: T) => void;
}) =>
  createElement(
    Styles ?? Fragment,
    null,
    <input
      type='radio'
      checked={checked}
      onChange={
        onChange && (() => {
          onChange?.(item);
        })
      }
    />,
    label,
  );

export default memo(RadioButton) as typeof RadioButton;
