import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button, ButtonGroup } from '@material-ui/core';
import Sidebar from './Sidebar';
import '../assets/Home.css';

const UserDB = require('../modules/UserDB');

function Home() {
  /* const [tags, setTags] = useState([]); */
  // eslint-disable-next-line no-unused-vars
  const [searchString, setSearchString] = useState('');
  const myStorage = window.sessionStorage;
  useEffect(() => {
    const userID = myStorage.getItem('UserID');
    UserDB.getUserDetails(userID, (success, userInfo, err) => {
      if (success) {
        setTags(userInfo.interests);
        setPosts(userInfo.posts);
        setWishList(userInfo.wishList);
      } else {
        console.log(err);
      }
    });
  }, []);

  const search = () => {};
  return (
    <div className="home-page">
      <Sidebar />
      <div>
        <div className="menu-title"><h1>Unite and Conquer</h1></div>
        <div className="menu-bar">
          <div className="new-post">
            <Link className="link" to="/create-post">
              <div className="text">New Post</div>
            </Link>
          </div>
          <Dropdown as={ButtonGroup}>
            <Button variant="success">Filter</Button>
            <Dropdown.Toggle split variant="success" id="dropdown-filter" />
            <Dropdown.Menu>
              <Dropdown.Item href="#/">Filter 1</Dropdown.Item>
              <Dropdown.Item href="#/">Filter 2</Dropdown.Item>
              <Dropdown.Item href="#/">Filter 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="search-field">
            <input onChange={(e) => setSearchString(e.target.value)} />
          </div>
          <button className="searchButton" type="button" onClick={search}>
            Search
          </button>
        </div>
        <table>
          <tr>
            <td>
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Home;
