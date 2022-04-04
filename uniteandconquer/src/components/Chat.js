/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import SidebarChat from './SidebarChat';
import '../assets/Chat.css';

const ChatDB = require('../modules/ChatDB');

function Chat() {
  const [text, setText] = useState('');
  const myStorage = window.sessionStorage;
  const userID = myStorage.getItem('UserID');
  // list of unread group's id. can be used from showing red dot on sidebarChat,
  // is update every 15 seconds
  const [unreadGroups, setUnreadGroups] = useState([]);
  // group user currently looking at
  // update when usr click sidebar
  const [currGroup, setCurrentGroup] = useState('');
  // list of {id:xx,groupName:xx} that user join
  // update when user get into chat page from other page
  const [groupList, setGroupList] = useState([]);
  // messages object of current group
  // 1. update when user switch group through sidebar
  // 2. update when current group is one of the unread group
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

  /** following two method are used to loop fetching unread group from database */

  /** get unread message of current group from db */
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

  /** get all groups that user join */
  useEffect(() => {
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

  const getChatMessages = () => (groupID) => {
    ChatDB.getChatMessages(groupID, (success, chatMessage, err) => {
      if (success) {
        setMessages(chatMessage);
      } else {
        console.log(err);
      }
    });
  };
  /** method pass to child component: SidebarChat
   * use to update current group when user click the side bar
  */
  const selectCurrGroup = (groupID) => {
    setCurrentGroup(groupID);
    getChatMessages(groupID);
    console.log(groupID);
  };
  /** used for showing group name on interface */
  const getGroupName = (groupID) => {
    console.log(groupList);
    let groupName = 'please select a group to begin chat';
    if (groupList !== [] && groupID !== '') {
      groupName = groupList.find((x) => x.id === groupID).groupName;
    }
    return groupName;
  };

  return (
    <div className="chat-page">
      <SidebarChat currGroupUpdate={selectCurrGroup} groupList={groupList} />
      <div>
        <div className="menu-title"><h1>{ getGroupName(currGroup)}</h1></div>
        <div className="chat-field">
          <input onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
