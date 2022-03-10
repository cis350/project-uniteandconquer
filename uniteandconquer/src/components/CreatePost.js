/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../assets/App.css';
import '../assets/CreatePost.css';

function CreatePost() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const createPost = () => {};

  const cancel = () => {};

  return (
    <div className="create-post-page">
      <Sidebar />
      <div className="create-post">
        <div className="post-input">
          <h3>Create a Post</h3>
          <div className="all-fields">
            {' '}
            <div className="post-text-fields">
              <div className="post-field">
                <div className="label">Item Name</div>
                <input onChange={(e) => setItem(e.target.value)} />
              </div>
              <div className="post-field">
                <div className="label">Price/Item</div>
                <input onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="post-field">
                <div className="label">Target Quantity</div>
                <input onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="post-field">
                <div className="label">Item Link</div>
                <input onChange={(e) => setLink(e.target.value)} />
              </div>
            </div>
            <div className="description">
              <div className="desc-label">Description</div>
              <textarea
                className="desc"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="create-post-tags">
              <div className="tags-label">Tags</div>
              <div className="post-tags">
                <div className="tag">Tag1</div>
                <div className="tag">Tag2</div>
                <div className="tag">Tag3</div>
                <div className="tag">Tag4</div>
                <div className="tag">Tag5</div>
                <div className="tag">Tag6</div>
              </div>
            </div>
          </div>
          <br />
          <div className="create-post-bottom">
            <button className="create" type="button" onClick={createPost}>
              Post
            </button>
            <button className="cancel" type="button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
