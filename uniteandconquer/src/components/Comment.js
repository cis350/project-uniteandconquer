import React, { useEffect, useState, useRef } from 'react';
import '../assets/Comment.css';

const postDB = require('../modules/PostDB');

const myStorage = window.sessionStorage;

function Comment(props) {
  const { postID } = props;
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(null);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    postDB.getPost(postID, (success, details) => {
      if (success) {
        setComments(details.comments);
      }
    });
  }, [flag]);

  const addComment = () => {
    const authorID = myStorage.getItem('UserID');
    if (commentInput && commentInput.length > 0) {
      postDB.addComment(authorID, postID, commentInput, (success, id, error) => {
        if (success) {
          setFlag(flag + 1);
        } else {
          console.log(error);
        }
      });
    }
  };

  /** create an useInterval hook for looping fetch */
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

  useInterval(() => {
    postDB.getPost(postID, (success, details) => {
      if (success) {
        setComments(details.comments);
      }
    });
  }, 5000);

  if (comments) {
    return (
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.author.firstName} className="comment">
            <div className="comment-img"><i className="far fa-user-circle " /></div>
            <div className="comment-text">
              <div className="comment-name">{comment.author.firstName}</div>
              <div className="comment-content">{comment.content}</div>
            </div>
          </div>
        ))}
        <div className="add-comment">
          <i className="far fa-user-circle" />
          <input data-testid="comment-input" value={commentInput} className="input-comment" onChange={(e) => setCommentInput(e.target.value)} />
          <button className="submit-comment" type="button" onClick={addComment}><div className="button-text">Comment</div></button>
        </div>
      </div>
    );
  }
  return null;
}

export default Comment;
