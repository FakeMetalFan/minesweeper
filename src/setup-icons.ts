import {
  library,
} from '@fortawesome/fontawesome-svg-core';

import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import {
  faBomb,
  faFlag,
  faFrown,
  faMeh,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

export default () => {
  library.add(faGithub, faBomb, faFlag, faMeh, faFrown, faSmile);
};
