import React from "react";
import { formatDistanceToNow } from "date-fns";

export default function CommentCard({ comment }) {
  const parsedDate = Date.parse(comment.created_at);
  const formatTimeToNow = formatDistanceToNow(new Date(parsedDate), {
    includeSeconds: true,
    addSuffix: true,
  });
  return (
    <li className="comment-card">
      <p>
        commented by {comment.author} {formatTimeToNow}
      </p>
      <p>{comment.body}</p>
      <button>+</button>
      {comment.votes}
      <button>-</button>
    </li>
  );
}
