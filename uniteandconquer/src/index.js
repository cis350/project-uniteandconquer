import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import PostDetails from './components/PostDetails';
import UserProfile from './components/UserProfile';
import UserSettingsPassword from './components/UserSettingsPassword';
import UserSettingsPersonalInformation from './components/UserSettingsPersonalInformation';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-details/*" element={<PostDetails />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-settings-password" element={<UserSettingsPassword />} />
        <Route path="/user-settings-personal-information" element={<UserSettingsPersonalInformation />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
