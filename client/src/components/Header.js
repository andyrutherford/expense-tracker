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
    <>
      <span className='header'>
        <h2>
          <i className='fas fa-coins'></i> Expense Tracker
        </h2>
        {isAuthenticated && (
          <button className='logout-btn' onClick={() => logoutUser()}>
            Logout
          </button>
        )}
      </span>
      {context.user && <p>Hello {context.user.name}</p>}
    </>
  );
};
