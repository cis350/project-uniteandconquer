import React from 'react';
import '../assets/Notifications.css';

function Notifications({ showNotifs, setShowNotifs }) {
  return (
    <div className="notifications-container">
      <div className="toggle-notifs">
        <button className="notif-button" type="button" onClick={() => setShowNotifs(!showNotifs)}>
          {' '}
          <i className="fas fa-times fa-2x" />
        </button>

      </div>
      <div className="notifications-title">Notifications</div>
      <div className="notif-time">Last Week</div>
      <div>
        <div className="notification-box">
          [Message] &#8226; 2 days ago
          {' '}
          <i className="fas fa-times" />
        </div>
        <div className="notification-box">
          [Message] &#8226; 3 days ago
          {' '}
          <i className="fas fa-times" />
        </div>
      </div>
      <div className="notif-time">22 Feb 2022</div>
      <div>
        <div className="notification-box">
          [Message] &#8226; 7 weeks ago
          {' '}
          <i className="fas fa-times" />
        </div>
        <div className="notification-box">
          [Message] &#8226; 6 weeks ago
          {' '}
          <i className="fas fa-times" />

        </div>
        <div className="notification-box">
          [Message] &#8226; 6 weeks ago
          {' '}
          <i className="fas fa-times" />

        </div>
      </div>
    </div>
  );
}

export default Notifications;
