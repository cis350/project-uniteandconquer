/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../assets/App.css';
import '../assets/CreatePost.css';

const PostDB = require('../modules/PostDB');

function CreatePost() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [currQuantity, setCurrQuantity] = useState(0);

  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const allTags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8'];

  /**
   * dummy user id
   */
  const userID = 1;
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

  const createPost = () => {
    if (!item || !price || !quantity || !link || !description || !tags) {
      throw new Error('You need to fill in all the blank');
    } else {
      PostDB.addPost(
        item,
        Number(quantity),
        Number(currQuantity),
        Number(price),
        link,
        description,
        userID,
        tags,
        (success, id, err) => {
          if (success) {
            navigate(`/post-details/${id}`);
          } else {
            console.log(err);
          }
        },
      );
    }
  };

  const cancel = () => {
    navigate('/');
  };

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
                <div className="label">Current Quantity</div>
                <input onChange={(e) => setCurrQuantity(e.target.value)} />
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
