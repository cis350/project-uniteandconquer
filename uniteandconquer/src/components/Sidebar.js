import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Sidebar.css';

function Sidebar() {
  const myStorage = window.sessionStorage;

  return (
    <div className="sidebar">
      <div className="greeting-box">
        <i className="far fa-user-circle fa-2x" />
        {' '}
        Hi,
        { myStorage.getItem('firstName') ? myStorage.getItem('firstName') : 'Guest'}
      </div>

      <div data-testid="profile-header" className="profile-box">
        <Link className="link" to="/user-profile">
          <div className="text">Profile</div>
        </Link>
      </div>
      <div data-testid="logout-header" className="logout-box">
        <Link className="link" to="/login">
          <div className="text">Login</div>
        </Link>
      </div>
      <div data-testid="ads-header" className="ad-box">
        <Link className="link" to="/">
          <div className="text-ad">Ads</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
