/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-modal';
import SidebarSettings from './SidebarSettings';
import '../assets/UserSettingsPassword.css';

const UserDB = require('../modules/UserDB');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFD9A0',
  },
};

function UserSettingsPassword() {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const myStorage = window.sessionStorage;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(null);
  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const updatePasswordWithVerify = async (userID) => {
    await UserDB.modifyUser(userID, 'password', password, oldPassword, (success, err) => {
      if (success) {
        setNote('Password updated successfully');
        showModal();
      } else {
        setNote('Password updated unsuccessfully');
        showModal();
      }
    });
  };

  const updatePassword = () => {
    const userID = myStorage.getItem('UserID');
    updatePasswordWithVerify(userID);
  };
  return (
    <div>
      <div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="modalContent">
              <h2>{note}</h2>
              <button className="modalButton" type="button" onClick={closeModal}>Close</button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="user-settings-password">
        <SidebarSettings />
        <div>
          <div className="menu-title"><h1>Password</h1></div>
          <div className="post-input">
            <div className="all-fields">
              {' '}
              <div className="post-fields">
                <div className="post-field">
                  <div className="label">Old Password</div>
                  <input onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="post-field">
                  <div className="label">New Password</div>
                  <input onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="post-field">
                  <div className="label">Confirm New Password</div>
                  <input onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="update" type="button" onClick={updatePassword}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsPassword;
