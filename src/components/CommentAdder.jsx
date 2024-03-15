import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { postComment } from "../api";

export default function CommentAdder({ setComments }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [keyProp, setKeyProp] = useState("");
  const [newComment, setNewComment] = useState({});
  const [newCommentText, setNewCommentText] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const { article_id } = useParams();

  const validateUser = () => {
    if (!loggedInUser.username) {
      setError("Please login to post a comment");
    }
  };

  useEffect(() => {
    if (newComment.author) {
      const key = Date.now().toString();
      setKeyProp(key);
      setComments((currComments) => {
        return [{ ...newComment, comment_id: keyProp }, ...currComments];
      });

      postComment(article_id, {
        username: newComment.author,
        body: newComment.body,
      })
        .then(() => {
          setSuccess("successfully posted!");
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        })
        .catch((error) => {
          setError("Comment failed to post");
        });
    }
  }, [newComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser();
    if (!error) {
      const newComment = {
        author: loggedInUser.username,
        body: newCommentText,
        votes: 0,
        created_at: new Date().toString(),
        article_id: Number(article_id),
      };
      setNewComment(newComment);
      setNewCommentText("");
    }
  };

  return (
    <form className="Comment-form" onSubmit={handleSubmit}>
      <label htmlFor="new-comment"></label>
      <textarea
        id="new-comment"
        type="text"
        multiline="true"
        placeholder="Add a comment"
        required={true}
        value={newCommentText}
        onChange={(e) => {
          setNewCommentText(e.target.value);
        }}
      ></textarea>

      <label htmlFor="submit-comment-button"></label>
      <button id="submit-comment-button" type="submit">
        Post Comment
      </button>
      {error && <p className="red-text">Error: {error}</p>}
      {success && <p className="green-text">{success}</p>}
    </form>
  );
}
