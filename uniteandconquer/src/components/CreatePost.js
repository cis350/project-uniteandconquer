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
  const [tags, setTags] = useState([

  ]);
  const navigate = useNavigate();
  const allTags = ['Appliances', 'Electronics', 'Books', 'Grocery and Food'];

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
    console.log(allTags);
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
                {allTags.map((tag) => (
                  <button type="button" className="tag" key={tag} id={tag} onClick={() => addTags(tag)}>{tag}</button>
                ))}
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
