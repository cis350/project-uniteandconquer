import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Chat from './components/Chat';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import PostDetails from './components/PostDetails';
import UserProfile from './components/UserProfile';
import UserSettings from './components/UserSettings';
import UserSettingsPersonalInformation from './components/UserSettingsPersonalInformation';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-details" element={<PostDetails />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/user-settings-personal-information" element={<UserSettingsPersonalInformation />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
