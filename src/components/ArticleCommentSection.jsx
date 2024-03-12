import React from "react";
import CommentCard from "./CommentCard";

export default function ArticleCommentSection({ comments }) {
  return (
    <div className="comments-container">
      <ul>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </div>
  );
}
