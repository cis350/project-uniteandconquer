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
  const [groupUsers, setGroupUsers] = useState([
    { name: 'Anna', quantity: 3 },
    { name: 'John', quantity: 5 },
  ]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const myStorage = window.sessionStorage;
  const allTags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8'];
  function addTags(tag) {
    if (tags.includes(tag)) {
      const newList = tags.filter((i) => i !== tag);
      setTags(newList);
    } else {
      setTags((arr) => [...arr, tag]);
    }
  }
  useEffect(() => {
    allTags.forEach((tag) => { document.getElementById(tag).className = 'tag'; });
    tags.forEach((tag) => { document.getElementById(tag).className = 'tag_selected'; });
  }, [tags]);

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
              Beautiful fairy lights you can use for your
              dorm
            </div>
          </div>
          <div className="group-details">
            <h3>Group Details</h3>
            <div className="size">
              Group size:
              {' '}
              {groupUsers.length}
            </div>
            <div className="group-member">
              <ul>
                {groupUsers.map((user) => (
                  <div className="group-user">
                    <div className="name">
                      {' '}
                      <i className="far fa-user-circle" />
                      {' '}
                      {user.name}
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
          <Comment />
        </div>
        <div className="post-detail-tags">
          <div className="tags-label">Tags</div>
          <div className="tags-container">
            <button className="tag" type="button" key="Tag1" id="Tag1" onClick={() => addTags('Tag1')}>Tag1</button>
            <button className="tag" type="button" key="Tag2" id="Tag2" onClick={() => addTags('Tag2')}>Tag2</button>
            <button className="tag" type="button" key="Tag3" id="Tag3" onClick={() => addTags('Tag3')}>Tag3</button>
            <button className="tag" type="button" key="Tag4" id="Tag4" onClick={() => addTags('Tag4')}>Tag4</button>
            <button className="tag" type="button" key="Tag5" id="Tag5" onClick={() => addTags('Tag5')}>Tag5</button>
            <button className="tag" type="button" key="Tag6" id="Tag6" onClick={() => addTags('Tag6')}>Tag6</button>
            <button className="tag" type="button" key="Tag7" id="Tag7" onClick={() => addTags('Tag7')}>Tag7</button>
            <button className="tag" type="button" key="Tag8" id="Tag8" onClick={() => addTags('Tag8')}>Tag8</button>
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

export default PostDetails;
