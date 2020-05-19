import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const context = useContext(GlobalContext);
  const { isAuthenticated, alerts, setAlert } = context;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.email === '' || user.password === '') {
      setAlert('Please enter a valid email and password.', 'danger');
    } else {
      context.loginUser({ email: user.email, password: user.password });
    }
  };

  return (
    <div className='form-control'>
      <h1>Account Login</h1>
      <p>
        Just testing? Login to a test account:{' '}
        <button
          onClick={() => {
            setUser({ email: 'frank@gmail.com', password: '123456' });
          }}
        >
          Fill
        </button>
      </p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={user.password}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
      <button
        className='btn btn-primary btn-block'
        onClick={() => props.history.push('/signup')}
      >
        Create an Account
      </button>
    </div>
  );
};
