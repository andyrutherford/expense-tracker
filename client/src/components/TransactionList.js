import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const context = useContext(GlobalContext);
  const {
    transactions,
    getTransactions,
    loading,
    deleteAllTransactions,
  } = context;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (transactions.length === 0) {
    return (
      <p
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Add a transactions below to get started!
      </p>
    );
  }

  return (
    <>
      <h3>
        <i className='fas fa-list-ul'></i> History{' '}
        {transactions.length > 0 && (
          <button className='btn-edit' onClick={() => deleteAllTransactions()}>
            Delete All
          </button>
        )}
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
