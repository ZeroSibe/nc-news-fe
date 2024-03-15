import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../api";

export default function CommentCard({ comment, setComments }) {
  const parsedDate = Date.parse(comment.created_at);

  const formattedDate = new Date(parsedDate).toLocaleString("en-GB", {
    timeZone: "UTC",
  });

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleDelete(e) {
    //own function make delete request
    e.preventDefault();
    setIsLoading(true);
    const commentId = e.target.value;
    deleteCommentById(commentId)
      .then(() => {
        setIsDeleteClicked(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        const errMsg = "Failed to delete comment please refresh to try again";
        setError(errMsg);
        setIsLoading(false);
      });
  }

  return (
    <li className="comment-card">
      {isLoading && <p>deleting comment...</p>}
      {error && <p className="red-text">Error: {error}</p>}
      {isDeleteClicked ? (
        <p className="green-text">
          Your comment has been successfully deleted...{" "}
        </p>
      ) : (
        <>
          <p>
            commented by {comment.author} {formattedDate}
          </p>
          <p>{comment.body}</p>
          <button>+</button>
          {comment.votes}
          <button>-</button>
          {loggedInUser.username === comment.author && (
            <button
              value={comment.comment_id}
              onClick={handleDelete}
              className="delete-button"
            >
              Delete
            </button>
          )}
        </>
      )}
    </li>
  );
}
