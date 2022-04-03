/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SidebarChat from './SidebarChat';
import '../assets/Chat.css';

function Chat() {
  const [text, setText] = useState('');

  const updateText = () => {};
  return (
    <div className="chat-page">
      <SidebarChat />
      <div>
        <div className="menu-title"><h1>Chat Group 0</h1></div>
        <div className="chat-field">
          <input onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
