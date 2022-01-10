import {
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from 'react';

import useInterval from 'hooks/use-interval';

import Counter from '../Counter';

export type Ref = {
  reset: () => void;
};

export default memo(forwardRef<Ref, {
  counting: boolean;
  initialCount?: number;
  step?: number;
  interval?: number;
}>(({
  counting,
  initialCount = 0,
  step = 1,
  interval = 1e3,
}, ref) => {
  const [
    count,
    setCount,
  ] = useState(initialCount);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setCount(initialCount);
    },
  }));

  useInterval(() => {
    setCount(count + step);
  }, counting ? interval : null);

  return (
    <Counter
      count={count}
    />
  );
}));
