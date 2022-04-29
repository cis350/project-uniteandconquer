import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="greeting-box">
        <i className="far fa-user-circle fa-2x" />
        {' '}
        Hi, Guest
      </div>

      <div className="profile-box">
        <Link className="link" to="/user-profile">
          <div className="text">Profile</div>
        </Link>
      </div>
      <div className="chat-box">
        <Link className="link" to="/chat">
          <div className="text">Chat</div>
        </Link>
      </div>
      <div className="login_button">

        <Link className="link" to="/login">
          <div className="text">Login</div>
        </Link>
      </div>
      <div className="ad-box">
        <Link className="link" to="/">
          <div className="text-ad">Ads</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
