/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SidebarSettings from './SidebarSettings';
import '../assets/UserSettingsPersonalInformation.css';

const UserDB = require('../modules/UserDB');

function UserSettingsPersonalInformation() {
  /** need to switch username and fullname to first name and last name */
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState([
    'Appliances', 'Electronics', 'Books', 'Grocery and Food',
  ]);
  const myStorage = window.sessionStorage;
  const userID = myStorage.getItem('UserID');

  const updateInformation = () => {};
  const updateTags = () => { };
  const handleFirstName = () => {
    UserDB.modifyUser(userID, 3, firstName, '', (success, err) => {
      if (!success) {
        console.log(err);
      }
    });
  };
  const handleLastName = () => {
    UserDB.modifyUser(userID, 4, lastName, '', (success, err) => {
      if (!success) {
        console.log(err);
      }
    });
  };
  const handlePhone = () => {
    UserDB.modifyUser(userID, 0, phoneNumber, '', (success, err) => {
      if (!success) {
        console.log(err);
      }
    });
  };
  const handleEmail = () => {
    UserDB.modifyUser(userID, 1, email, '', (success, err) => {
      if (!success) {
        console.log(err);
      }
    });
  };
  const handleInterests = () => {
    UserDB.modifyUser(userID, 5, tags, '', (success, err) => {
      if (!success) {
        console.log(err);
      }
    });
  };

  return (
    <div className="user-settings-personal-information">
      <SidebarSettings />
      <div>
        <div className="menu-title"><h1>Personal Information</h1></div>
        <div className="post-input">
          <div className="all-fields">
            {' '}
            <div className="post-text-fields">
              <div className="post-field">
                <div className="label">Username</div>
                <input onChange={(e) => setUsername(e.target.value)} />
                <button className="confirm" type="button" onClick={setUsername}>
                  update
                </button>
              </div>
              <div className="post-field">
                <div className="label">Full Name</div>
                <input onChange={(e) => setFullName(e.target.value)} />
                <button className="confirm" type="button" onClick={setFullName}>
                  update
                </button>
              </div>
              <div className="post-field">
                <div className="label">Phone Number</div>
                <input onChange={(e) => setPhoneNumber(e.target.value)} />
                <button className="confirm" type="button" onClick={setPhoneNumber}>
                  update
                </button>
              </div>
              <div className="post-field">
                <div className="label">Email</div>
                <input onChange={(e) => setEmail(e.target.value)} />
                <button className="confirm" type="button" onClick={setEmail}>
                  update
                </button>
              </div>
            </div>
            <div className="create-post-tags">
              <div className="tags-label">Tags</div>
              <div className="post-tags">
                {tags.map((tag) => (
                  <button type="button" className="tag">{tag}</button>
                ))}
              </div>
            </div>
          </div>
          <br />
          <div className="create-post-bottom">
            <button className="update-tags" type="button" onClick={updateTags}>
              Update Tags
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsPersonalInformation;
