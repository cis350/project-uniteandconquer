import '../assets/ResetPassword.css';

import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import Modal from 'react-modal';

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

function ResetPassword() {
  const [countryCode, setCountryCode] = useState('1');
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(null);
  const options = [
    '1', '44', '1684',
  ];

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    await UserDB.forgetPassword(countryCode, phone, email, password, (success) => {
      if (success) {
        setNote('Successfully reset your password');
        showModal();
      } else {
        setNote('Please try again!');
        showModal();
      }
    });
  };

  return (
    <div className="reset-wrapper">
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
      <div data-testid="registration-input" className="registration-field">
        <div className="label">phone</div>
        <div className="full-phone-input">
          <Dropdown className="area-code" options={options} value={countryCode} onChange={(value) => setCountryCode(value.value)} placeholder="Select an option" />
          <input data-testid="phone-input" className="phone-input" onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="registration-field">
        <div className="label">email</div>
        <input data-testid="email-input" className="email-input" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="registration-field">
        <div className="label">password</div>
        <input data-testid="password-input" className="password-input" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="reg-bottom">
        <button className="submit" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
