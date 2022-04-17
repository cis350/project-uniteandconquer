import React, { useEffect, useState } from 'react';
import '../assets/Comment.css';

const postDB = require('../modules/PostDB');

function Comment(props) {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(null);
  /**
   * temperary information
   */
  const firstName = 'Yuxi';
  const secondName = 'Dai';
  const authorID = 1;
  const postID = 1;

  useEffect(() => {
    const { histComments } = props;
    setComments(histComments);
  }, []);

  const addComment = () => {
    if (commentInput && commentInput.length > 0) {
      const newComment = {
        createdAt: new Date().getDate(),
        author: { firstName, secondName },
        content: commentInput,
      };
      setComments([...comments, newComment]);
      setCommentInput('');

      postDB.addComment(authorID, postID, newComment, (success, id, error) => {
        if (success) {
          //
        } else {
          console.log(error);
        }
      });
    }
  };

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
          <input value={commentInput} className="input-comment" onChange={(e) => setCommentInput(e.target.value)} />
          <button className="submit-comment" type="button" onClick={addComment}><div className="button-text">Comment</div></button>
        </div>
      </div>
    );
  }
  return null;
}

export default Comment;
