import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import * as Styles from './styles';

export default () => (
  <Styles.Header>
    Minesweeper
    <Styles.Link
      href='https://github.com/FakeMetalFan/minesweeper'
      target='_blank'
      rel='noopener noreferrer'
    >
      <FontAwesomeIcon
        icon={
          [
            'fab',
            'github',
          ]
        }
      />
    </Styles.Link>
  </Styles.Header>
);
