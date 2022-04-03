/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SidebarSettings from './SidebarSettings';
import '../assets/UserSettingsPassword.css';

function UserSettingsPassword() {
  const [password, setPassword] = useState('');

  const updatePassword = () => {};

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
                <input onChange={(e) => null} />
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
