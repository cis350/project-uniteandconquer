/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/App.css';
import '../assets/Registration.css';

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tags, setTags] = useState([]);

  const createUser = () => {};

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
          <div className="registration-text-fields">
            <div className="registration-field">
              <div className="label">first name</div>
              <input onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="registration-field">
              <div className="label">last name</div>
              <input onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="registration-field">
              <div className="label">phone</div>
              <input onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="registration-field">
              <div className="label">email</div>
              <input onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="registration-field">
              <div className="label">password</div>
              <input onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="registration-field">
              <div className="label">confirm password</div>
              <input onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <br />
          <div className="reg-bottom">
            <button className="submit" type="button" onClick={createUser}>
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
