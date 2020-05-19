import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export const Header = (props) => {
  const history = useHistory();
  const context = useContext(GlobalContext);
  const { loadUser, logoutUser, isAuthenticated, user, setAlert } = context;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const logoutHandler = () => {
    logoutUser();
    setAlert('You have been logged out.', 'success');
    history.push('/login');
  };

  return (
    <>
      <span className='header'>
        <h1>
          <i className='fas fa-coins'></i>&nbsp;Expense Tracker
        </h1>
        {isAuthenticated && user && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ul>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
            </ul>
            &nbsp;|&nbsp;
            <Link className='btn-nav' onClick={logoutHandler} to='/login'>
              Logout
            </Link>
          </div>
        )}
      </span>
    </>
  );
};
