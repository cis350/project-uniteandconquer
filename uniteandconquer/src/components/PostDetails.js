/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Comment from './Comment';
import '../assets/PostDetails.css';

const PostDB = require('../modules/PostDB');

// In the post details page, one can choose to join the group
// if successful, redirect the user to the post which the user joins in
function PostDetails() {
  const [desiredQuantity, setDesiredQuantity] = useState(0);
  const [validQuantity, setValidQuantity] = useState(false);
  const navigate = useNavigate();
  const myStorage = window.sessionStorage;
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    PostDB.getPost('', (success, details) => {
      if (success) {
        setPostDetails(details);
      }
    });
  }, []);
  const joinGroup = () => {
    const userID = myStorage.getItem('UserID');
    const postID = '';
    const quantity = 2;
    PostDB.joinGroup(userID, postID, quantity, (success, err) => {
      if (success) {
        navigate(`/post-details/${postID}`);
      } else {
        console.log(err);
      }
    });
  };

  const back = () => {
    navigate('/');
  };

  const quantityValidation = () => {
    const num = /^\d+$/;

    if (desiredQuantity) {
      if (desiredQuantity.match(num)) {
        setValidQuantity(true);
      } else {
        setValidQuantity(false);
      }
    } else {
      setValidQuantity(false);
    }
  };

  useEffect(() => {
    quantityValidation();
  });

  if (postDetails) {
    return (
      <div className="post-details-page">
        <Sidebar />
        <div className="post-details-container">
          <div className="item-name">
            <h1>{postDetails.itemName}</h1>
          </div>
          <div className="post-details-content">
            <div className="item-details">
              <h3>Item Details</h3>
              <div className="item-detail">
                Target Quantity:
                {' '}
                {postDetails.itemNumTarget}
              </div>

              <div className="item-detail">
                Current Quantity:
                {' '}
                {postDetails.itemNumCurrent}
              </div>

              <div className="item-detail">
                Price/Item: $
                {postDetails.pricePerItem}
              </div>

              <div className="item-detail">
                Item Link:
                {' '}
                <a href={postDetails.itemURL}>Click here to go the item page</a>
              </div>

              <div className="item-detail">
                Description:
                {' '}
                {postDetails.itemDescription}
              </div>

            </div>
            <div className="group-details">
              <h3>Group Details</h3>
              <div className="size">
                Group size:
                {' '}
                {postDetails.group.length}
              </div>
              <div className="group-member">
                <ul>
                  {postDetails.group.map((user) => (
                    <div className="group-user" key={user.firstName}>
                      <div className="name">
                        {' '}
                        <i className="far fa-user-circle" />
                        {' '}
                        {user.firstName}
                      </div>
                      <div className="quantity">
                        Quantity:
                        {' '}
                        {user.quantity}
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="comment-section">
            <Comment histComments={postDetails.comments} />
          </div>
          <div className="post-detail-tags">
            <div className="tags-label">Tags</div>
            <div className="tags-container">
              {postDetails.tags.map((tag) => (
                <button type="button" className="tag" key={tag}>{tag}</button>
              ))}
            </div>
          </div>
          <div className="buttons-container">
            <div className="desired-quantity">
              <input
                placeholder="desired quantity"
                onChange={(e) => setDesiredQuantity(e.target.value)}
              />
            </div>
            <div className="horizontal-buttons">
              <button
                disabled={!validQuantity}
                className="create-button"
                type="button"
                onClick={joinGroup}
              >
                Join
              </button>
              <button className="cancel-button" type="button" onClick={back}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default PostDetails;
