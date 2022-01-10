import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  Footer,
  Link,
} from './styles';

export default () => (
  <Footer>
    <span>
      Powered by
      <Link
        href="https://github.com/FakeMetalFan"
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
      &copy;
      <span>
        {new Date().getFullYear()}
      </span>
    </span>
  </Footer>
);
