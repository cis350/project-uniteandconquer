import React from 'react';
import SidebarSettings from './SidebarSettings';
import '../assets/UserSettings.css';

function UserSettings() {
  return (
    <div className="user-settings">
      <SidebarSettings />
      <div>
        <div className="menu-title"><h1>Notification</h1></div>
        <div className="notification-bar">
          <div className="chat-notification">Notify chat messages</div>
          <div className="group-status-notification">Notify group status</div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
