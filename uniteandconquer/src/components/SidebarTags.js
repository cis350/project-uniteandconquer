import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/SidebarTags.css';


function SidebarTags({ tags }) {
  const tagListGenerator = () => tags.map((tag) => (<div className="preference-tag">{tag}</div>));

  return (
    <div className="sidebar">
      <div className="greeting-box">
        <i className="far fa-user-circle fa-2x" />
        {' '}
        Hi, Jeremy
      </div>

      <div className="home-box">
        <Link className="link" to="/">
          <div className="text">Home</div>
        </Link>
      </div>
      <div className="settings-box">
        <Link className="link" to="/user-settings-personal-information">
          <div className="text">Settings</div>
        </Link>
      </div>
      <div className="preferences-box">
        <div className="preferences-title">My Preferences</div>

        {tagListGenerator()}

      </div>
    </div>
  );
}

export default SidebarTags;
