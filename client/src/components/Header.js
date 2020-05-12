import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
  const context = useContext(GlobalContext);

  return (
    <span>
      <h2>Expense Tracker</h2>
      {context.user && <p>{context.user}</p>}
    </span>
  );
};
