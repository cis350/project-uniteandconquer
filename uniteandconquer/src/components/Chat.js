/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import SidebarChat from './SidebarChat';
import '../assets/Chat.css';

const ChatDB = require('../modules/ChatDB');

function Chat() {
  const [text, setText] = useState('');
  const myStorage = window.sessionStorage;
  const userID = myStorage.getItem('UserID');
  const userName = myStorage.getItem('UserName');
  // list of unread group's id. can be used from showing red dot on sidebarChat,
  // is update every 15 seconds
  const [unreadGroups, setUnreadGroups] = useState([]);
  // group user currently looking at
  // update when usr click sidebar
  const [currGroup, setCurrentGroup] = useState('');
  // list of {id:xx,groupName:xx} that user join
  // update when user get into chat page from other page
  const [groupList, setGroupList] = useState([]);
  // all messages object of current group
  // used to show message on screen
  // 1. update when user switch group through sidebar
  // 2. update when current group is one of the unread group
  // 3. update when user send a chat
  const [messages, setMessages] = useState([]);

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
  }, 15000);

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
        console.log(chatMessage);
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
    console.log(currGroup);
  };
  /** used for showing group name on interface */
  const getGroupName = (groupID) => {
    let groupName = 'please select a group to begin chat';
    if (groupList !== [] && groupID !== '') {
      groupName = groupList.find((x) => x.id === groupID).groupName;
    }
    return groupName;
  };

  const handleSend = () => {
    ChatDB.createMessage(userID, currGroup, text, (success, chatMessage, err) => {
      if (success) {
        const myDate = new Date().toISOString();
        const myMessage = { author: userName, content: text, createdAt: myDate };
        setMessages((message) => [...message, myMessage]);
        // please show the text on screen
      } else {
        // unable to send
        console.log(err);
      }
    });
  };
  const messageWindow = (messageList) => {
    console.log(messageList);
    messageList.map((m) => (
      <div>lalalala</div>
      // <div>
      //   {m.author}
      //   :
      //   {m.content}
      // </div>
    ));
  };

  return (
    <div className="chat-page">
      <SidebarChat currGroupUpdate={selectCurrGroup} groupList={groupList} />
      <div>
        <div className="menu-title"><h1>{getGroupName(currGroup)}</h1></div>
        {/* {messageWindow(messages)} */}
        { messages.map((m) => (
          <div>
            {m.author}
            :
            {m.content}
          </div>
        ))}
        <div className="chat-field">
          <input onChange={(e) => setText(e.target.value)} />
          <button className="send" type="button" onClick={handleSend}> send </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
