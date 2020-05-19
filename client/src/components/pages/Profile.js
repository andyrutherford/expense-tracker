import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Profile = (props) => {
  const context = useContext(GlobalContext);
  const { loadUser, setAlert, changePassword } = context;
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { oldPassword, newPassword, confirmNewPassword } = user;

  useEffect(() => {
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
  };

  return (
    <>
      <h3>
        <span>
          <i className='fas fa-user-circle'></i> Your Account
        </span>
      </h3>
      <form>
        <div className='form-control'>
          <label htmlFor='text'>Name</label>
          <input type='text' value={context.user.name} disabled />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>Email</label>
          <input type='text' value={context.user.email} disabled />
        </div>
      </form>
      <h3>
        <span>
          <i className='fas fa-unlock-alt'></i> Change Your Password
        </span>
      </h3>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Old Password</label>
          <input
            type='password'
            name='oldPassword'
            value={oldPassword}
            onChange={onChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>New Password</label>
          <input
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={onChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='text'>Confirm New Password</label>
          <input
            type='password'
            name='confirmNewPassword'
            value={confirmNewPassword}
            onChange={onChange}
          />
        </div>
        <button className='btn'>
          <i className='fas fa-save'></i> Save
        </button>
      </form>
    </>
  );
};
