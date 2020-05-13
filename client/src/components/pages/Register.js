import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Register = (props) => {
  const context = useContext(GlobalContext);
  const { isAuthenticated } = context;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
    if (
      user.name === '' ||
      user.email === '' ||
      user.password === '' ||
      user.confirmPassword === ''
    ) {
      alert('Please fill in all fields!');
    } else if (user.password !== user.confirmPassword) {
      alert('Passwords must match!');
    } else {
      context.createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  };

  return (
    <div className='form-control'>
      <h1>Create an Account</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={user.name}
            onChange={onChange}
            required
          />
        </div>
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
        <div className='form-group'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Submit'
          className='btn btn-primary btn-block'
        />
      </form>
      <button className='btn' onClick={() => props.history.push('/login')}>
        Login
      </button>
    </div>
  );
};
