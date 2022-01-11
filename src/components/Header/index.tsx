import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  Header,
  Link,
} from './styles';

export default () => (
  <Header>
    Minesweeper
    <Link
      href="https://github.com/FakeMetalFan/minesweeper"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={
          [
            'fab',
            'github',
          ]
        }
      />
    </Link>
  </Header>
);
