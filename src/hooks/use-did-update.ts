import {
  useEffect,
  useRef,
} from 'react';

export default (callback: () => void, ...deps: unknown[]) => {
  const didUpdate = useRef(false);

  useEffect(() => {
    if (didUpdate.current) {
      callback();

      return;
    }

    didUpdate.current = true;
  }, deps);
};
