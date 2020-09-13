import React from 'react';

import './Cell.scss';

export const Cell = ({ state, clickHandler }) => {
  if (!state.isVisible) return (<div className='cell cell__hidden' onClick={clickHandler} />);
  if (state.isEmpty) return (<div className='cell cell__visible cell__visible__empty' />);
  if (state.isUndermined) return (<div className='cell cell__visible cell__visible__busted-mine' />);

  return (<div className={`cell cell__visible cell__visible__${state.value}`}>{state.value}</div>);
};
