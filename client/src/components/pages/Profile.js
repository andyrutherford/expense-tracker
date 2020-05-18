import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Profile = () => {
  const { loadUser } = useContext(GlobalContext);
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    console.log('use effect profile');
    loadUser();
  }, []);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h3>
        <span>
          <i className='fas fa-unlock-alt'></i> Change Your Password
        </span>
      </h3>
      <form>
        <div className='form-control'>
          <label htmlFor='text'>Old Password</label>
          <input
            type='text'
            name='oldPassword'
            value={user.oldPassword}
            onChange={onChange}
            placeholder=''
          />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>New Password</label>
          <input
            type='text'
            name='newPassword'
            value={user.newPassword}
            onChange={onChange}
            placeholder=''
          />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>Confirm New Password</label>
          <input
            type='text'
            name='confirmNewPassword'
            value={user.confirmNewPassword}
            onChange={onChange}
            placeholder=''
          />
        </div>
        <button className='btn'>
          <i className='fas fa-save'></i>
          Save
        </button>
      </form>
    </>
  );
};
