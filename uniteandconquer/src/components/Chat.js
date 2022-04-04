/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import SidebarChat from './SidebarChat';
import '../assets/Chat.css';

const ChatDB = require('../modules/ChatDB');

function Chat() {
  const [text, setText] = useState('');
  const myStorage = window.sessionStorage;
  const userID = myStorage.getItem('UserID');
  // list of unread group's id
  const [unreadGroups, setUnreadGroups] = useState([]);
  // group user currently looking at
  const [currGroup, setCurrentGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [messages, setMessages] = useState([]);

  const updateText = () => { };
  /** create an useInterval hook for looping fetch */
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
      return null;
    }, [delay]);
  }
  /** loop fetching unread group from database */
  /** update message of current group */
  const getUnreadMessage = () => {
    ChatDB.getUnreadChatMessage(currGroup, (success, newMessage, err) => {
      if (success) {
        setMessages((message) => [...message, ...newMessage]);
      } else {
        console.log(err);
      }
    });
  };

  useInterval(() => {
    ChatDB.getUnreadChatGroup(userID, (success, unreadList, err) => {
      if (success) {
        if (unreadList.length !== 0) {
          const idList = unreadList.map((group) => (group.id));
          setUnreadGroups(idList);
          /** current group's message has new update */
          if (currGroup !== '' && idList.includes(currGroup)) {
            getUnreadMessage();
          }
        }
      } else {
        console.log(err);
      }
    });
  }, 5000);

  /** get all groups user join */
  useEffect(() => {
    // console.log('la');
    // console.log(currGroup);
    ChatDB.getChatGroup(userID, (success, chatList, err) => {
      if (success) {
        if (chatList.length !== 0) {
          setGroupList(chatList);
        }
      } else {
        console.log(err);
      }
    });
  }, []);

  const selectCurrGroup = (groupID) => {
    setCurrentGroup(groupID);
    console.log(groupID);
  };

  return (
    <div className="chat-page">
      <SidebarChat currGroupUpdate={selectCurrGroup} groupList={groupList} />
      <div>
        <div className="menu-title"><h1>{ currGroup}</h1></div>
        <div className="chat-field">
          <input onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
