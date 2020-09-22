import React, { useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDidUpdate } from 'hooks';

import { formatCount } from 'utils';

import './Indicators.scss';

export const Indicators = ({ minesCount, smileyFaceClickHandler, shouldStartCountingSeconds, isBust, isVictory }) => {
  const [secondsCount, setSecondsCount] = useState(0);
  const intervalId = useRef();

  useDidUpdate(() => {
    shouldStartCountingSeconds && (intervalId.current = setInterval(() => {
      setSecondsCount(count => count + 1);
    }, 1e3));
  }, shouldStartCountingSeconds);

  useDidUpdate(() => {
    (isBust || isVictory) && clearInterval(intervalId.current);
  }, isBust, isVictory);

  return (
    <div className='indicators'>
      <div className='mines-count'>{formatCount(minesCount)}</div>
      <div className='smiley-face' onClick={() => {
        clearInterval(intervalId.current);
        setSecondsCount(0);
        smileyFaceClickHandler();
      }}>
        <FontAwesomeIcon icon={['far', isVictory ? 'smile' : isBust ? 'frown' : 'meh']} />
      </div>
      <div className='timer'>{formatCount(secondsCount)}</div>
    </div>
  );
};
