import React from "react";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import CommentAdder from "./CommentAdder";

export default function ArticleCommentSection({
  comments,
  isLoadingComments,
  setComments,
}) {
  return isLoadingComments ? (
    <Loading />
  ) : (
    <section className="comments-container">
      <h2>Comments</h2>
      <CommentAdder setComments={setComments} />
      <ul>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </section>
  );
}
