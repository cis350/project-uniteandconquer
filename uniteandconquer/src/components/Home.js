import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
// import Dropdown from 'react-dropdown';
import Select from 'react-select';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { Button, ButtonGroup } from '@material-ui/core';
import Sidebar from './Sidebar';
import '../assets/Home.css';
import tagsList from '../data/tags.json';

const PostDB = require('../modules/PostDB');

function Home() {
  /* const [tags, setTags] = useState([]); */

  /* make the set ofd posts a list, not a table */
  /* consider a bootstrap dropdown element
     else write it yourself */
  /* roy has a dropdown that works so learn from that */
  // eslint-disable-next-line no-unused-vars
  const [searchString, setSearchString] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const myStorage = window.sessionStorage;

  // time interval hook
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
      return null;
    }, [delay]);
  }

  // get all posts when user get into the page
  useEffect(() => {
    PostDB.getSortedPostsInRange(0, 19, (success, postInfo, err) => {
      if (success) {
        setPosts(postInfo);
      } else {
        console.log(err);
      }
    });
  }, []);

  useInterval(() => {
    const tagList = selectedTags.map((tag) => (tag.value));
    PostDB.getSortedPostsBySearch(0, 19, tagList, searchString, (success, postInfo, err) => {
      if (success) {
        console.log(tagList, searchString);
        setPosts(postInfo);
      } else {
        console.log(err);
      }
    });
  }, 5000);

  const handleSearch = () => {
    const tagList = selectedTags.map((tag) => (tag.value));
    PostDB.getSortedPostsBySearch(0, 19, tagList, searchString, (success, postInfo, err) => {
      if (success) {
        console.log(tagList, searchString);
        setPosts(postInfo);
      } else {
        console.log(err);
      }
    });
  };

  const postsListGenerator = () => posts.map(
    (post) => {
      const url = `/post-details/${post.id}`;
      myStorage.setItem('PostID', post.id);
      const date = new Date(post.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' });

      return (
        <li>
          <Link className="link" to={url}>
            <div className="post-title">This is Post</div>
            <div className="post-content">
              This post is led by Jeremy and trades
              {' '}
              {post.itemName}
              {' '}
              for $
              {post.pricePerItem}
              {' '}
              with
              maturity
              {' '}
              {date}
            </div>
          </Link>
        </li>
      );
    },
  );

  // const filters = ['filter 0', 'filter 1', 'filter 2'];
  // const tags = [
  //   { value: 'filter0', label: 'filter0' },
  //   { value: 'filter1', label: 'filter1' },
  //   { value: 'filter2', label: 'filter2' },
  // ];
  const handleTagFilter = (Selectedtags) => {
    setSelectedTags(Selectedtags);
  };
  const tagFilter = () => (
    <Select
      isMulti
      name="tags"
      options={tagsList}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleTagFilter}
    />
  );
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
          {tagFilter()}
          <div className="search-field">
            <input onChange={(e) => setSearchString(e.target.value)} />
          </div>
          <button className="searchButton" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <list>
          {postsListGenerator()}
        </list>
      </div>
    </div>
  );
}

export default Home;
