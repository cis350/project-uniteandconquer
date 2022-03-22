/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import '../assets/App.css';
import '../assets/Registration.css';

const UserDB = require('../modules/UserDB');

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validReqs, setValidReqs] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [tags, setTags] = useState([]);
  const options = [
    'US (+1)', 'UK (+44)', 'AS (+1684)',
  ];
  const navigate = useNavigate();

  // register the user given the information provided
  // if the password and confimPassword are not correct, then throw an exception
  const registerUser = () => {
    if (password !== confirmPassword) {
      throw new Error('password and confirmPassword need to be the same');
    }
    UserDB.createUser(
      phone,
      email,
      password,
      firstName,
      lastName,
      tags,
      (success, id, err) => {
        if (success) {
          navigate('/login');
        } else {
          console.log(err);
        }
      },
    );
  };

  const firstNameValidation = () => {
    const alpha = /^([a-zA-Z]){2,15}$/;
    if (firstName) {
      if (firstName.match(alpha)) {
        setValidFirstName(true);
      } else {
        setValidFirstName(false);
      }
    }
  };

  const LastNameValidation = () => {
    const alpha = /^([a-zA-Z]){2,15}$/;

    if (lastName) {
      if (lastName.match(alpha)) {
        setValidLastName(true);
      } else {
        setValidLastName(false);
      }
    }
  };

  const phoneValidation = () => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im;

    if (phone) {
      if (phone.match(phoneRegex)) {
        setValidPhone(true);
      } else {
        setValidPhone(false);
      }
    }
  };

  const emailValidation = () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (email) {
      if (email.match(emailRegex)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
  };

  const passwordValidation = () => {
    const pwRule = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

    if (password) {
      if (password.match(pwRule)) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    }
  };

  const confirmPasswordValidation = () => {
    if (password && password === confirmPassword) {
      setValidConfirmPassword(true);
    } else {
      setValidConfirmPassword(false);
    }
  };

  const allReqs = () => {
    if (validFirstName && validLastName && validConfirmPassword && validEmail && validPhone) {
      setValidReqs(true);
    } else {
      setValidReqs(false);
    }
  };

  useEffect(() => {
    firstNameValidation();
    LastNameValidation();
    passwordValidation();
    confirmPasswordValidation();
    phoneValidation();
    emailValidation();
    allReqs();
  });

  return (
    <div className="registration-page">
      <div className="registration">
        <div className="registration-tags">
          <div className="headers">
            <h1>Unite and Conquer</h1>
            <h3>Choose your interests</h3>
          </div>
          <div className="tags">
            <div className="tag">Tag1</div>
            <div className="tag">Tag2</div>
            <div className="tag">Tag3</div>
            <div className="tag">Tag4</div>
            <div className="tag">Tag5</div>
            <div className="tag">Tag6</div>
          </div>
        </div>
        <div className="registration-input">
          <h3>Get Started</h3>
          <div className="input-reqs">
            <div>
              <h2>Password Requires</h2>
              <div className="rule">1. at least 8 characters</div>
              <div className="rule">2. at least one special character (e.g. ! @ # ? ])</div>
              <div className="rule">3. at least one uppercase and one lowercase letter</div>
              <div className="rule">4. at least one number</div>
            </div>
            <div>
              <h2>First/Last Name Requires</h2>
              <div className="rule">1. 2-15 characters</div>
              <div className="rule">2. Alphabetic characters</div>
            </div>
          </div>
          <div className="registration-text-fields">
            <div className="registration-field">
              <div className="label">first name</div>
              <input className="first-name-input" onChange={(e) => setFirstName(e.target.value)} />
              {validFirstName ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
            </div>
            <div className="registration-field">
              <div className="label">last name</div>
              <input className="last-name-input" onChange={(e) => setLastName(e.target.value)} />
              {validLastName ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
            </div>
            <div className="registration-field">
              <div className="label">phone</div>
              <div className="full-phone-input">
                <Dropdown className="area-code" options={options} value={options[0]} placeholder="Select an option" />
                <input className="phone-input" onChange={(e) => setPhone(e.target.value)} />

              </div>
              {validPhone ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
            </div>
            <div className="registration-field">
              <div className="label">email</div>
              <input className="email-input" onChange={(e) => setEmail(e.target.value)} />
              {validEmail ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
            </div>
            <div className="registration-field">
              <div className="label">password</div>
              <input className="password-input" onChange={(e) => setPassword(e.target.value)} />
              {validPassword ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
            </div>
            <div className="registration-field">
              <div className="label">confirm password</div>
              <input className="confirm-password-input" onChange={(e) => setConfirmPassword(e.target.value)} />
              {validConfirmPassword ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
            </div>
          </div>
          <br />
          <div className="reg-bottom">
            <button disabled={!validReqs} className="submit" type="button" onClick={registerUser}>
              Register
            </button>
            <p>
              Already have an account?
              {' '}
              <Link to="/login">Login</Link>
              {' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
