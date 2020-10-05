import { useEffect, useRef } from 'react';

export const useDidUpdate = (fn, ...deps) => {
  const fnRef = useRef();
  const didMount = useRef(false);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    if (didMount.current) fnRef.current();
    else didMount.current = true;
  }, deps);
};
