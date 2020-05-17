import React, { useContext } from 'react';
import { numberWithCommas } from '../utils/format';

import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const context = useContext(GlobalContext);
  const { transactions } = context;

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className='balance'>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </div>
  );
};
