import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="greeting">
        <i className="far fa-user-circle fa-2x" />
        {' '}
        Hi, Jeremy
      </div>

      <div className="profile">
        <Link className="link" to="/user-profile">
          <div className="text">Profile</div>
        </Link>
      </div>
      <div className="chat">
        <Link className="link" to="/chat">
          <div className="text">Chat</div>
        </Link>
      </div>
      <div className="logout">
        <Link className="link" to="/logout">
          <div className="text">Logout</div>
        </Link>
      </div>
      <div className="ad">
        <Link className="link" to="/">
          <div className="text-ad">Ads</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
