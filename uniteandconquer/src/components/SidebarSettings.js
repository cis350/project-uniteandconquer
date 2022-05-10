import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/SidebarSettings.css';

const myStorage = window.sessionStorage;
function SidebarSettings() {
  return (
    <div className="sidebarSettings">
      <div className="greeting">
        <i className="far fa-user-circle fa-2x" />
        {' '}
        Hi,
        {myStorage.getItem('firstName') ? myStorage.getItem('firstName') : 'Guest'}
      </div>

      <div data-testid="main-page-header" className="main-page">
        <Link className="link" to="/">
          <div className="text">Back to Main Page</div>
        </Link>
      </div>
      <div data-testid="personal-information-header" className="personal-information">
        <Link className="link" to="/user-settings-personal-information">
          <div className="text">Personal Information</div>
        </Link>
      </div>
      <div data-testid="password-header" className="password">
        <Link className="link" to="/user-settings-password">
          <div className="text">Password</div>
        </Link>
      </div>
    </div>
  );
}

export default SidebarSettings;
