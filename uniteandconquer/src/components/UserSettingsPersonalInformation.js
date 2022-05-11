/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-modal';
import SidebarSettings from './SidebarSettings';
import '../assets/UserSettingsPersonalInformation.css';

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

function UserSettingsPersonalInformation() {
  /** need to switch username and fullname to first name and last name */
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const myStorage = window.sessionStorage;
  const userID = myStorage.getItem('UserID');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(null);
  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const handleFirstName = async () => {
    try {
      await UserDB.modifyUser(userID, 'firstName', firstName, '', (success, err) => {
        if (success) {
          setNote('Successfully updated first name');
        } else {
          setNote('Unsuccessfully updated first name');
        }
        showModal();
      });
    } catch (err) {
      //
    }
  };
  const handleLastName = async () => {
    try {
      await UserDB.modifyUser(userID, 'lastName', lastName, '', (success, err) => {
        if (success) {
          setNote('Successfully updated last name');
        } else {
          setNote('Unsuccessfully updated last name');
        }
        showModal();
      });
    } catch (err) {
      //
    }
  };

  const handleEmail = async () => {
    try {
      await UserDB.modifyUser(userID, 'email', email, '', (success, err) => {
        if (success) {
          setNote('Successfully updated email');
        } else {
          setNote('Unsuccessfully updated email');
        }
        showModal();
      });
    } catch (err) {
      //
    }
  };

  return (
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
      <div className="user-settings-personal-information">
        <SidebarSettings />
        <div>
          <div className="menu-title"><h1>Personal Information</h1></div>
          <div className="post-input">
            <div className="all-fields">
              <div className="post-fields">
                <div className="post-field">
                  <div className="label">First Name</div>
                  <input data-testid="username-input" onChange={(e) => setfirstName(e.target.value)} />
                  <button data-testid="username-update" className="confirm" type="button" onClick={handleFirstName}>
                    update
                  </button>
                </div>
                <div className="post-field">
                  <div className="label">Last Name</div>
                  <input data-testid="name-input" onChange={(e) => setlastName(e.target.value)} />
                  <button data-testid="name-update" className="confirm" type="button" onClick={handleLastName}>
                    update
                  </button>
                </div>
                <div className="post-field">
                  <div className="label">Email</div>
                  <input data-testid="email-input" onChange={(e) => setEmail(e.target.value)} />
                  <button data-testid="email-update" className="confirm" type="button" onClick={handleEmail}>
                    update
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>

  );
}

export default UserSettingsPersonalInformation;
