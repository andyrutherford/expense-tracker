import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const context = useContext(GlobalContext);
  const { transactions, getTransactions, loading } = context;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>
        <i className='fas fa-list-ul'></i> History
      </h3>
      <ul className='list'>
        {transactions !== null && !loading ? (
          transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
};
