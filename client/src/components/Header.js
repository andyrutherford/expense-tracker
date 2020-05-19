import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        <h2>
          <i className='fas fa-coins'></i> Expense Tracker
        </h2>
        {isAuthenticated && user && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ul>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
            </ul>
            &nbsp;|&nbsp;
            <button className='btn-nav' onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </span>
    </>
  );
};
