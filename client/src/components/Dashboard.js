import React, { useEffect, useContext } from 'react';
import { Balance } from './Balance';
import { IncomeExpenses } from './IncomeExpenses';
import { TransactionList } from './TransactionList';
import { AddTransaction } from './AddTransaction';
import { GlobalContext } from '../context/GlobalState';

export const Dashboard = () => {
  const context = useContext(GlobalContext);

  useEffect(() => {
    context.loadUser();
  }, []);

  return (
    <div>
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  );
};
