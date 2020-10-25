import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDidUpdate, useInterval } from 'hooks';

import './Indicators.scss';

export const Indicators = ({ minesCount, smileyFaceClickHandler, shouldStartCountingSeconds, isBust, isVictory }) => {
  const [secondsCount, setSecondsCount] = useState(0);
  const [isCountingSeconds, setIsCountingSeconds] = useState(false);

  const formatCount = count => {
    if (count < 1) return '000';
    if (count < 10) return `00${count}`;
    if (count < 100) return `0${count}`;

    return `${count}`;
  };

  const handleSmileyFaceClick = () => {
    setIsCountingSeconds(false);
    setSecondsCount(0);
    smileyFaceClickHandler();
  };

  useDidUpdate(() => {
    shouldStartCountingSeconds && setIsCountingSeconds(true);
  }, shouldStartCountingSeconds);

  useDidUpdate(() => {
    (isBust || isVictory) && setIsCountingSeconds(false);
  }, isBust, isVictory);

  useInterval(() => {
    setSecondsCount(secondsCount + 1);
  }, isCountingSeconds ? 1e3 : null);

  return <div className='indicators'>
    <div className='mines-count'>{formatCount(minesCount)}</div>
    <div className='smiley-face' onClick={handleSmileyFaceClick}>
      <FontAwesomeIcon icon={['far', isVictory ? 'smile' : isBust ? 'frown' : 'meh']} />
    </div>
    <div className='timer'>{formatCount(secondsCount)}</div>
  </div>;
};
