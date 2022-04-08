/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import '../assets/App.css';

const UserDB = require('../modules/UserDB');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const myStorage = window.sessionStorage;
  // We need to ensure that the username and password are not null
  // And the username and password are in good format, if any.
  // And compare whether the username and password match.

  // We check whether a user using email or phone number as username
  // by checking whether the username_ include '@'.
  const checkPassword = (username_, password_) => {
    if (username_.includes('@')) {
      UserDB.loginUserWithEmail(username_, password_, (success, id, err) => {
        if (success) {
          myStorage.setItem('UserID', id);
        } else {
          console.log(err);
        }
        return success;
      });
    } else {
      UserDB.loginUserWithPhone(username_, password_, (success, id, err) => {
        if (success) {
          myStorage.setItem('UserID', id);
        } else {
          console.log(err);
        }
        return success;
      });
    }
  };
  const login = () => {
    if (username.length <= 0 || password.length <= 0) {
      throw new Error('Invalid username and password. It cannot be empty');
    } else if (!checkPassword(username, password)) {
      throw new Error('Incorrect password or username not exists');
    } else if (checkPassword(username, password)) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="logo"><h1>Unite and Conquer</h1></div>
      <div className="login">
        <h2>Login to your account</h2>
        <div className="login-field">
          <input className="field" placeholder="phone or email" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="login-field">
          <input className="field" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <button className="submit" type="button" onClick={login}>
          login
        </button>
        <p>
          Do not already have an account?
          {' '}
          <Link to="/registration">Sign up</Link>
          {' '}
        </p>
      </div>

    </div>
  );
}

export default Login;
