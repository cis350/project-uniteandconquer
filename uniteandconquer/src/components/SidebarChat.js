import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/SidebarChat.css';

function SidebarChat() {
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
      <div className="chat">
        <div className="text">Chat 0</div>
      </div>
      <div className="chat1">
        <div className="text">Chat 1</div>
      </div>
      <div className="chat2">
        <div className="text">Chat 2</div>
      </div>
    </div>
  );
}

export default SidebarChat;
