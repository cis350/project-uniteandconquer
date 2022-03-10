/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import '../assets/App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {};

  return (
    <div className="login-page">
      <div className="logo"><h1>Unite and Conquer</h1></div>
      <div className="login">
        <h2>Login to your account</h2>
        <div className="login-field">
          <input className="field" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
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
