import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDidUpdate, useInterval } from 'hooks';

import './Indicators.scss';

export const Indicators = ({ minesCount, smileyFaceClickHandler, shouldStartCountingSeconds, isBust, isVictory }) => {
  const [secondsCount, setSecondsCount] = useState(0);
  const [intervalDelay, setIntervalDelay] = useState(null);

  const formatCount = count => {
    if (count < 1) return '000';
    if (count < 10) return `00${count}`;
    if (count < 100) return `0${count}`;

    return `${count}`;
  };

  useDidUpdate(() => {
    shouldStartCountingSeconds && setIntervalDelay(1e3);
  }, shouldStartCountingSeconds);

  useDidUpdate(() => {
    (isBust || isVictory) && setIntervalDelay(null);
  }, isBust, isVictory);

  useInterval(() => {
    setSecondsCount(count => count + 1);
  }, intervalDelay);

  return (
    <div className='indicators'>
      <div className='mines-count'>{formatCount(minesCount)}</div>
      <div className='smiley-face' onClick={() => {
        setIntervalDelay(null);
        setSecondsCount(0);
        smileyFaceClickHandler();
      }}>
        <FontAwesomeIcon icon={['far', isVictory ? 'smile' : isBust ? 'frown' : 'meh']} />
      </div>
      <div className='timer'>{formatCount(secondsCount)}</div>
    </div>
  );
};
