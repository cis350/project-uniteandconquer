import React from 'react';
// import { Link } from 'react-router-dom';
import '../assets/SidebarChat.css';

function SideChats({ group }) {
//   console.log(group);
  return (
    <div>{(typeof group !== 'undefined') ? group.groupName : null}</div>
  );
}

export default SideChats;
