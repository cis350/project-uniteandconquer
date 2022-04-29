/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import SidebarChat from './SidebarChat';
import SideChats from './SideChats';
import '../assets/Chat.css';

const ChatDB = require('../modules/ChatDB');
const UserDB = require('../modules/UserDB');

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
    const myDate = new Date().toISOString();
    ChatDB.getChatMessagesAfterTime(currGroup, myDate, (success, newMessage, err) => {
      if (success) {
        setMessages((message) => [...message, ...newMessage]);
      } else {
        console.log(err);
      }
    });
  };

  useInterval(() => {
    if (currGroup !== '') {
      getUnreadMessage();
    }
  }, 15000);

  /** get all groups that user join */
  useEffect(() => {
    UserDB.getChats(userID, (success, chatList, err) => {
      if (success) {
        if (chatList.length !== 0) {
          setGroupList(chatList);
        }
      } else {
        console.log(err);
      }
    });
  }, []);

  const getCurrChatMessages = (groupID) => {
    ChatDB.getChatMessages(groupID, (success, chatList, err) => {
      if (success) {
        if (chatList.length !== 0) {
          setMessages(chatList);
        }
      } else {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    getCurrChatMessages(currGroup);
  }, [currGroup]);

  /** method pass to child component: SidebarChat
   * use to update current group when user click the side bar
  */

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

  return (
    <div className="chat-page">
      <div className="menu-title"><h1>{getGroupName(currGroup)}</h1></div>
      <div className="chat-main">
        <div className="chat-side">
          <div className="home-button">
            <Link className="link" to="/">
              <div className="">Back to Main Page</div>
            </Link>
          </div>
          {groupList.map((group) => (
            <div
              className="chat-button"
              role="button"
              tabIndex={0}
              onClick={() => setCurrentGroup(group.id)}
              onKeyPress={() => setCurrentGroup(group.id)}
            >
              {group.groupName}
              <SideChats conversation={group} />
            </div>
          ))}
        </div>
        {/* <SidebarChat currGroupUpdate={selectCurrGroup} groupList={groupList} /> */}
        <div className="chat-messaging">
          {/* {messageWindow(messages)} */}
          <div className="messages">
            { messages.map((m) => (
              <div>
                {m.author}
                :
                {m.content}
              </div>
              // you can add a Message.js file to make message beutiful
              // <Message text={m}/>
            ))}
          </div>
          <div className="chat-field">
            <input onChange={(e) => setText(e.target.value)} />
            <button className="send" type="button" onClick={handleSend}> send </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
