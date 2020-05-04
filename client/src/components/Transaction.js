import React, { useContext } from 'react';
import { numberWithCommas } from '../utils/format';

import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
  const context = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
      {transaction.text}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className='delete-btn'
        onClick={() => context.deleteTransaction(transaction._id)}
      >
        x
      </button>
    </li>
  );
};
