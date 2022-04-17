import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarTags from './SidebarTags';
import Notifications from './Notifications';
import '../assets/UserProfile.css';

const UserDB = require('../modules/UserDB');

function UserProfile() {
  const [showNotifs, setShowNotifs] = useState(false);
  /** used for showing interest in side bar */
  const [tags, setTags] = useState([]);
  /** list of posts and whish list that will show on profile page */
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [wishList, setWishList] = useState([]);

  const myStorage = window.sessionStorage;
  const PostTableGenerator = (postsOrWishList) => {
    const table = postsOrWishList.map((post) => {
      const url = `/post-details/${post.id}`;
      return (
        <div>
          <tr className="table-post">
            <td className="table-post-content">
              <Link className="link" to={url}>
                <div className="post-title">
                  Post:
                  {' '}
                  <br />
                  {' '}

                  {post.itemName}
                  - [
                  {post.status}
                  ]
                </div>
                <div className="post-content">
                  This post is led by [
                  {post.ownerName}
                  ] and trades [
                  {post.itemNumTarget}
                  ] of [
                  {post.itemNumCurrent}
                  ] for
                  $[
                  {post.pricePerItem}
                  ]
                  <br />
                  <br />
                  [
                  {post.tags}
                  ]
                </div>
              </Link>
            </td>
          </tr>
        </div>
      );
    });
    return table;
  };

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

  return (
    <div className="user-profile-page">
      <SidebarTags tags={tags} />
      <div>
        <div className="profile-title"><h1>My Profile</h1></div>
        <div className="bell-pos">
          <button className="bell-button" type="button" onClick={() => setShowNotifs(!showNotifs)}>
            {' '}
            <i className="fas fa-bell fa-2x" />
          </button>
        </div>
        <div className="notifications-pos">{showNotifs ? <Notifications showNotifs={showNotifs} setShowNotifs={setShowNotifs} /> : ''}</div>
        <div className="table-lists">
          <table>
            <thead>
              <tr>
                <td>My Active Posts</td>
              </tr>
            </thead>
            <tbody>
              { PostTableGenerator(posts)}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <td>My Wishlist</td>
              </tr>
            </thead>
            <tbody>
              { PostTableGenerator(wishList)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
