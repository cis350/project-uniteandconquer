/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import '../assets/Login.css';
import '../assets/App.css';

const UserDB = require('../modules/UserDB');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginWithPhone, setLoginWithPhone] = useState(true);

  const navigate = useNavigate();
  const myStorage = window.sessionStorage;
  const [countryCode, setCountryCode] = useState('1');
  const options = [
    '1', '44', '1684',
  ];
  // We need to ensure that the username and password are not null
  // And the username and password are in good format, if any.
  // And compare whether the username and password match.

  // We check whether a user using email or phone number as username
  // by checking whether the username_ include '@'.
  const checkPassword = async (username_, password_) => {
    let result;
    if (username_.includes('@')) {
      await UserDB.loginUserWithEmail(username_, password_, (success, id, err) => {
        if (success) {
          myStorage.setItem('UserID', id);
          myStorage.setItem('loginAuth', JSON.stringify({ email: username_ }));
        } else {
          console.log(err);
        }
        result = success;
      });
    } else {
      await UserDB.loginUserWithPhone(countryCode, username_, password_, (success, id, err) => {
        console.log(success);
        if (success) {
          myStorage.setItem('UserID', id);
          myStorage.setItem('loginAuth', JSON.stringify({ phone: username_ }));
        } else {
          console.log(err);
        }
        result = success;
      });
    }
    console.log(result);
    return result;
  };
  const login = async() => {
    if (username.length <= 0 || password.length <= 0) {
      throw new Error('Invalid username and password. It cannot be empty');
    } else if (!await checkPassword(username, password)) {
      throw new Error('Incorrect password or username not exists');
    } else if (await checkPassword(username, password)) {
      navigate('/');
    }
  };

  const handleLoginWithPhone = () => {
    setLoginWithPhone(true);
  };

  const handleLoginWithEmail = () => {
    setLoginWithPhone(false);
  };

  return (
    <div className="login-page">
      <div className="logo"><h1>Unite and Conquer</h1></div>
      <div className="login">
        <h2>Login to your account</h2>
        {loginWithPhone ? (
          <div className="dropdown-div">
            <Dropdown className="dropdown" options={options} value={countryCode} onChange={(value) => setCountryCode(value.value)} />
            <input className="phone-field" placeholder="Phone Number" onChange={(e) => setUsername(e.target.value)} />
          </div>
        ) : (
          <input className="field" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
        )}

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
        <div className="switchButton">
          <button type="button" className="switch" onClick={handleLoginWithPhone}>
            With Phone
          </button>
          &nbsp;&nbsp;&nbsp;
          <button type="button" className="switch" onClick={handleLoginWithEmail}>
            With Email
          </button>
        </div>
      </div>

    </div>
  );
}

export default Login;
