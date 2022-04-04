import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/SidebarChat.css';

function SidebarChat({ currGroupUpdate, groupList }) {
  const chatListGenerator = () => groupList.map((group) => (
    <div
      className={group.groupName}
      role="button"
      tabIndex={0}
      onClick={() => currGroupUpdate(group.id)}
      onKeyPress={() => currGroupUpdate(group.id)}
    >
      { group.groupName}
    </div>

  ));

  return (
    <div className="sidebar">
      <div className="greeting">
        <i className="far fa-user-circle fa-2x" />
        {' '}
        Hi, Jeremy
      </div>

      <div className="main-page">
        <Link className="link" to="/">
          <div className="text">Back to main menu</div>
        </Link>
      </div>
      {chatListGenerator()}
    </div>
  );
}

export default SidebarChat;
