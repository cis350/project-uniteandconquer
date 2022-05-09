import React from 'react';
import '../assets/Notifications.css';

const notifyDB = require('../modules/NotificationDB');

const myStorage = window.sessionStorage;
const userID = myStorage.getItem('UserID');

function Notifications({
  showNotifs, setShowNotifs, notifs, setNotifs,
}) {
  const messageGenerator = () => notifs.map(
    (notif) => {
      const message = notif.content;
      const date = new Date(notif.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' });
      return (
        <div>
          {message}
          {' '}
          {date}
        </div>
      );
    },
  );
  const handleClick = () => {
    notifyDB.deleteNotifications(userID, notifs, (success, err) => {
      if (success) {
        console.log('click');
        setNotifs([]);
      } else {
        console.log(err);
      }
    });
    setShowNotifs(!showNotifs);
  };

  return (
    <div className="notifications-container">
      <div className="toggle-notifs">
        <button className="notif-button" type="button" onClick={handleClick}>
          {' '}
          <i className="fas fa-times fa-2x" />
        </button>

      </div>
      <div className="notifications-title">Notifications</div>

      {messageGenerator()}

    </div>

  );
}

export default Notifications;
