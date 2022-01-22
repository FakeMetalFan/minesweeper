import {
  memo,
} from 'react';

import RadioButton from 'components/RadioButton';
import RadioGroup from 'components/RadioGroup';

import SETTINGS from 'constants/settings';

import * as Styles from './styles';

export default memo(({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (settings: Settings) => void;
}) => (
  <RadioGroup
    items={SETTINGS}
    Styles={Styles.Group}
    renderRadioButton={
      (item) => {
        const {
          label,
        } = item;

        return (
          <RadioButton
            item={item}
            label={label}
            checked={label === settings.label}
            Styles={Styles.Radio}
            onChange={onChange}
            key={label}
          />
        );
      }
    }
  />
));
