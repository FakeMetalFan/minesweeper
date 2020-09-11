import React from 'react';

import './Cell.scss';

export const Cell = ({ state, clickHandler }) => {
  if (!state.isVisible) return (<td className='hidden' onClick={clickHandler} />);
  if (state.isEmpty) return (<td className='visible visible__empty' />);
  if (state.isUndermined) return (<td className='visible visible__busted-mine' />);

  return (<td className={`visible__${state.value}`}>{state.value}</td>);
};
