import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
  const context = useContext(GlobalContext);
  const { loadUser, logoutUser, isAuthenticated } = context;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <span>
      <h2>Expense Tracker</h2>
      {isAuthenticated && <button onClick={() => logoutUser()}>Logout</button>}
      {context.user && <p>Hello {context.user.name}</p>}
    </span>
  );
};
