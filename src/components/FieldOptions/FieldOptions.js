import React from 'react';

import { fieldProducerType } from 'const';

export const FieldOptions = ({ fieldOptionsHandler }) => (
  <div className='field-options'>
    <button onClick={() => {fieldOptionsHandler(fieldProducerType.SM);}}>Novice</button>
    <button onClick={() => {fieldOptionsHandler(fieldProducerType.MD);}}>Intermediate</button>
    <button onClick={() => {fieldOptionsHandler(fieldProducerType.BG);}}>Advanced</button>
  </div>
);
