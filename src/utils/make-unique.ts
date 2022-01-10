import {
  uniqueId,
} from 'lodash-es';

export default <O extends Record<string, unknown>>(obj: O) => ({
  ...obj,
  id: uniqueId(),
});
