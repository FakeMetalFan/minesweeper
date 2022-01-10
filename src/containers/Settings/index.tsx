import {
  memo,
} from 'react';

import RadioButton from 'components/RadioButton';
import RadioGroup from 'components/RadioGroup';

import SETTINGS from 'constants/settings';

import {
  Group,
  Radio,
} from './styles';

export default memo(({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (settings: Settings) => void;
}) => (
  <RadioGroup
    items={SETTINGS}
    Styles={Group}
    renderRadioButton={
      (item: Settings) => {
        const {
          label,
        } = item;

        return (
          <RadioButton
            item={item}
            label={label}
            checked={label === settings.label}
            Styles={Radio}
            onChange={onChange}
            key={label}
          />
        );
      }
    }
  />
));
