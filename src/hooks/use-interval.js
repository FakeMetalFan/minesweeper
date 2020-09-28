import { useEffect } from 'react';

export const useInterval = (fn, delay) => {
  useEffect(() => {
    if (delay) {
      const intervalId = setInterval(() => {
        fn();
      }, delay);

      return () => {
        clearInterval(intervalId);
      };
    }
    // eslint-disable-next-line
  }, [delay]);
};
