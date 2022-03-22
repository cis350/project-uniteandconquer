import React, { useState } from 'react';
import '../assets/Comment.css';

function Comment() {
  const [tempID, setTempID] = useState(3);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'user1', content: 'I loved using this item' },
    { id: 2, name: 'user2', content: 'I wonder if I will need this' },
  ]);

  const addComment = () => {
    const newComment = { id: tempID, name: `user${tempID}`, content: commentInput };
    setComments([...comments, newComment]);
    setTempID(tempID + 1);
  };

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.name} className="comment">
          <div className="comment-img"><i className="far fa-user-circle " /></div>
          <div className="comment-text">
            <div className="comment-name">{comment.name}</div>
            <div className="comment-content">{comment.content}</div>
          </div>
        </div>
      ))}
      <div className="add-comment">
        <i className="far fa-user-circle" />
        <input data-testid="comment-input" className="input-comment" onChange={(e) => setCommentInput(e.target.value)} />
        <button className="submit-comment" type="button" onClick={addComment}><div className="button-text">Comment</div></button>
      </div>
    </div>
  );
}

export default Comment;
