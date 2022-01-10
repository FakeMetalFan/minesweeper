import {
  memo,
  useCallback,
  useRef,
} from 'react';

import Counter from 'components/Counter';
import Face from 'components/Face';
import Timer, {
  Ref,
} from 'components/Timer';

import useDidUpdate from 'hooks/use-did-update';

import Styles from './styles';

export default memo(({
  settings,
  status,
  onReset,
}: {
  settings: Settings;
  status: Status;
  onReset: () => void;
}) => {
  const timerRef = useRef<Ref>(null);

  const {
    hiddenMines,
    busted,
    solved,
    init
  } = status;

  const resetTimer = () => {
    timerRef.current?.reset();
  };

  useDidUpdate(resetTimer, settings);

  return (
    <Styles>
      <Counter
        count={hiddenMines}
      />
      <Face
        frown={busted}
        smile={solved}
        onClick={
          useCallback(() => {
            onReset();
            resetTimer();
          }, [])
        }
      />
      <Timer
        counting={init && !(solved || busted)}
        ref={timerRef}
      />
    </Styles>
  );
});
