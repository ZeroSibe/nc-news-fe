import React from "react";

export default function CommentCard({ comment }) {
  const parsedDate = Date.parse(comment.created_at);
  const formattedDate = new Date(parsedDate).toLocaleString("en-GB", {
    timeZone: "UTC",
  });
  return (
    <li className="comment-card">
      <p>
        commented by {comment.author} {formattedDate}
      </p>
      <p>{comment.body}</p>
      <button>+</button>
      {comment.votes}
      <button>-</button>
    </li>
  );
}
