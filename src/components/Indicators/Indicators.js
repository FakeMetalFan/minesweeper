import React from 'react';

export const Indicators = ({ minesCount }) => {

  return (
    <div className='indicators'>
      <div className='mines-count'>{minesCount}</div>
      <div className='smiley-face' />
      <div className='timer' />
    </div>
  );
};
