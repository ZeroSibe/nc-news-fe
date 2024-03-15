import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../api";

export default function CommentCard({ comment, setComments }) {
  const parsedDate = Date.parse(comment.created_at);

  const formattedDate = new Date(parsedDate).toLocaleString("en-GB", {
    timeZone: "UTC",
  });

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [deleteComment, setDeleteComment] = useState({});

  useEffect(() => {
    loggedInUser.username === comment.author
      ? setDeleteBtn(true)
      : setDeleteBtn(false);
  }, [loggedInUser]);

  useEffect(() => {
    if (deleteComment.comment_id) {
      setTimeout(
        () =>
          setComments((currCommets) => {
            return [...currCommets];
          }),
        100
      );
      //has to be existing post delete
      console.log(deleteComment.comment_id);
      deleteCommentById(deleteComment.comment_id)
        .then((res) => {
          //204 only after a
          console.log(res);
          alert("deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [deleteComment]);

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteComment(comment);
    console.log(comment);
    setDeleteBtn(false);
    console.log("send message to user to wait");
  };

  return (
    <li className="comment-card">
      <p>
        commented by {comment.author} {formattedDate}
      </p>
      <p>{comment.body}</p>
      <button>+</button>
      {comment.votes}
      <button>-</button>

      {deleteBtn && (
        <button value={deleteBtn} onClick={handleDelete} className="delete-btn">
          Delete Comment
        </button>
      )}
    </li>
  );
}
