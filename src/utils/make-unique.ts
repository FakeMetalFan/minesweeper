import {
  uniqueId,
} from 'lodash-es';

export default <T extends Record<string, unknown>>(obj: T) => ({
  ...obj,
  id: uniqueId(),
});
