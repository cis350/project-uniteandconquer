/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Comment from './Comment';
import '../assets/PostDetails.css';

const PostDB = require('../modules/PostDB');

// In the post details page, one can choose to join the group
// if successful, redirect the user to the post which the user joins in
function PostDetails() {
  const [desiredQuantity, setDesiredQuantity] = useState(0);
  const navigate = useNavigate();
  const myStorage = window.sessionStorage;
  const joinGroup = () => {
    const userID = myStorage.getItem('UserID');
    const postID = 0;
    const quantity = 2;
    PostDB.joinGroup(userID, postID, quantity, (success, err) => {
      if (success) {
        navigate(`/post-details${postID}`);
      } else {
        console.log(err);
      }
    });
  };
  const back = () => {
    navigate('/');
  };

  return (
    <div className="post-details-page">
      <Sidebar />
      <div className="post-details-container">
        <div className="item-name">
          <h1>Item Name</h1>
        </div>
        <div className="post-details-content">
          <div className="item-details">
            <h3>Item Details</h3>
            <div className="item-detail">Target Quantity: 4/5</div>
            <div className="item-detail">Price/Item: $10.00</div>
            <div className="item-detail">Item Link: exampleurl.com/item</div>
            <div className="item-detail">
              Description:
              {' '}
              <br />
              {' '}
              Beautiful fairy lights you can use for your dorm
            </div>
          </div>
          <div className="group-details">
            <h3>Group Details</h3>
            <div className="size">Group size: 2</div>
            <div className="group-member">
              <ul>
                <li>
                  <div className="name">
                    {' '}
                    <i className="far fa-user-circle" />
                    {' '}
                    Anna
                  </div>
                  <div className="quantity">Quantity: 1</div>
                </li>
                <li>
                  <div className="name">
                    {' '}
                    <i className="far fa-user-circle" />
                    {' '}
                    Jeff
                  </div>
                  <div className="quantity">Quantity: 3</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="comment-section"><Comment /></div>
        <div className="post-detail-tags">
          <div className="tags-label">Tags</div>
          <div className="tags-container">
            <div className="tag">Tag1</div>
            <div className="tag">Tag2</div>
            <div className="tag">Tag3</div>
            <div className="tag">Tag4</div>
            <div className="tag">Tag5</div>
            <div className="tag">Tag6</div>
          </div>
        </div>
        <div className="buttons-container">
          <div className="desired-quantity"><input placeholder="desired quantity" onChange={(e) => setDesiredQuantity(e.target.value)} /></div>
          <button className="create" type="button" onClick={joinGroup}>
            Join
          </button>
          <button className="cancel" type="button" onClick={back}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
