import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Profile = (props) => {
  const { loadUser, setAlert, changePassword } = useContext(GlobalContext);
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { oldPassword, newPassword, confirmNewPassword } = user;

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return setAlert('All input fields are required.', 'danger');
    }

    if (newPassword !== confirmNewPassword) {
      return setAlert('New passwords do not match.', 'danger');
    }

    if (oldPassword === newPassword) {
      return setAlert(
        'New password must be different from old password.',
        'danger'
      );
    }

    changePassword({ oldPassword, newPassword });
    setTimeout(() => {
      props.history.push('/');
    }, 3000);
  };

  return (
    <>
      <h3>
        <span>
          <i className='fas fa-unlock-alt'></i> Change Your Password
        </span>
      </h3>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Old Password</label>
          <input
            type='text'
            name='oldPassword'
            value={oldPassword}
            onChange={onChange}
            placeholder=''
          />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>New Password</label>
          <input
            type='text'
            name='newPassword'
            value={newPassword}
            onChange={onChange}
            placeholder=''
          />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>Confirm New Password</label>
          <input
            type='text'
            name='confirmNewPassword'
            value={confirmNewPassword}
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
