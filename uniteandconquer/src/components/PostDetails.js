import React from 'react';
import Sidebar from './Sidebar';
import '../assets/PostDetails.css';

function PostDetails() {
  const joinGroup = () => {};
  const back = () => {};

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
