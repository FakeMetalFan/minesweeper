import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import * as Styles from './styles';

export default () => (
  <Styles.Footer>
    <span>
      Powered by
      <Styles.Link
        href='https://github.com/FakeMetalFan'
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
      &copy;
      <span>
        {new Date().getFullYear()}
      </span>
    </span>
  </Styles.Footer>
);
