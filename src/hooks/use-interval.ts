import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export default (callback: () => void, interval?: number | null) => {
  const callbackRef = useRef<typeof callback>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (interval) {
      const id = setInterval(() => {
        callbackRef.current?.();
      }, interval);

      return () => {
        clearInterval(id);
      };
    }
  }, [interval]);
};
