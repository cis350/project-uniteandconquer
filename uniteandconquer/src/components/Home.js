import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Sidebar from './Sidebar';
import '../assets/Home.css';

function Home() {
  /* const [tags, setTags] = useState([]); */
  /* make the set ofd posts a list, not a table */
  /* consider a bootstrap dropdown element
     else write it yourself */
  /* roy has a dropdown that works so learn from that */
  // eslint-disable-next-line no-unused-vars
  const [searchString, setSearchString] = useState('');

  const filters = ['filter 0', 'filter 1', 'filter 2'];
  const defaultFilter = filters[0];
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
          <Dropdown options={filters} value={defaultFilter} placeholder="Select an option" />
          <div className="search-field">
            <input onChange={(e) => setSearchString(e.target.value)} />
          </div>
          <button className="searchButton" type="button" onClick={search}>
            Search
          </button>
        </div>
        <list>
          <li>
            <Link className="link" to="/post-details">
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </Link>
          </li>
          <li>
            <Link className="link" to="/post-details">
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </Link>
          </li>
          <li>
            <Link className="link" to="/post-details">
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </Link>
          </li>
          <li>
            <Link className="link" to="/post-details">
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </Link>
          </li>
          <li>
            <Link className="link" to="/post-details">
              <div className="post-title">This is Post</div>
              <div className="post-content">
                This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                maturity [DATE]
              </div>
            </Link>
          </li>
        </list>
      </div>
    </div>
  );
}

export default Home;
