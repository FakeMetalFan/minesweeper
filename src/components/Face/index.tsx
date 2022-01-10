import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  memo,
} from 'react';

import Styles from './styles';

type Props = {
  frown?: boolean;
  smile?: boolean;
  onClick?: () => void;
};

const getFaceIcon = ({
  frown,
  smile
}: Props) => {
  if (frown) {
    return (
      <FontAwesomeIcon
        icon={
          [
            'fas',
            'frown',
          ]
        }
      />
    );
  }

  if (smile) {
    return (
      <FontAwesomeIcon
        icon={
          [
            'fas',
            'smile',
          ]
        }
      />
    );
  }

  return (
    <FontAwesomeIcon
      icon={
        [
          'fas',
          'meh',
        ]
      }
    />
  );
};

export default memo((props: Props) => (
  <Styles
    onClick={props.onClick}
  >
    {getFaceIcon(props)}
  </Styles>
));
