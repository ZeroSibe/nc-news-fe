import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../api";
import { formatDistanceToNow } from "date-fns";

export default function CommentCard({ comment }) {
  const parsedDate = Date.parse(comment.created_at);
  const formattedDate = formatDistanceToNow(new Date(parsedDate), {
    addSuffix: true,
  });

  const { loggedInUser } = useContext(UserContext);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    const commentId = e.target.value;
    deleteCommentById(commentId)
      .then(() => {
        setIsDeleteClicked(true);
        setIsLoading(false);
      })
      .catch((error) => {
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
          Your comment has been deleted successfully...{" "}
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
              aria-label="Delete this comment"
            >
              Delete
            </button>
          )}
        </>
      )}
    </li>
  );
}
