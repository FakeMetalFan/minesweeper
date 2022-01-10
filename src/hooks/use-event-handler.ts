import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

type EventHandler = (event: Event) => void;

export default <T extends EventTarget, E extends Event>(
  eventName: string,
  callback: (event: E) => void,
  target: T | null | Document = document,
) => {
  const callbackRef = useRef<typeof callback>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handleEvent = (event: E) => {
      callbackRef.current?.(event);
    };

    target?.addEventListener(eventName, handleEvent as EventHandler);

    return () => {
      target?.removeEventListener(eventName, handleEvent as EventHandler);
    };
  }, [eventName, target]);
};
