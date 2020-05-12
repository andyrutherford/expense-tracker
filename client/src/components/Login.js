import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const context = useContext(GlobalContext);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.email === '' || user.password === '') {
      alert('Please fill in both fields!');
    } else {
      context.loginUser({ email: user.email, password: user.password });
    }
  };

  return (
    <div className='form-control'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={user.email}
            onChange={onChange}
            required
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
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
      <div></div>
    </div>
  );
};
