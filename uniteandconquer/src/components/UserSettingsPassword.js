/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SidebarSettings from './SidebarSettings';
import '../assets/UserSettingsPassword.css';

const UserDB = require('../modules/UserDB');

function UserSettingsPassword() {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const myStorage = window.sessionStorage;

  const updatePasswordWithVerify = (userID) => {
    UserDB.modifyUser(userID, 2, password, oldPassword, (success, err) => {
      if (!success) {
        console.log(err);
      }
    });
  };

  const updatePassword = () => {
    const userID = myStorage.getItem('UserID');
    UserDB.getPassword(userID, (success, err) => {
      if (success) {
        updatePasswordWithVerify(userID);
      } else {
        console.log(err);
      }
    });
  };
  return (
    <div className="user-settings-password">
      <SidebarSettings />
      <div>
        <div className="menu-title"><h1>Password</h1></div>
        <div className="post-input">
          <div className="all-fields">
            {' '}
            <div className="post-text-fields">
              <div className="post-field">
                <div className="label">Old Password</div>
                <input onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="post-field">
                <div className="label">New Password</div>
                <input onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="post-field">
                <div className="label">Confirm New Password</div>
                <input onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </div>
          <br />
          <div className="password-bottom">
            <button className="update" type="button" onClick={updatePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsPassword;
