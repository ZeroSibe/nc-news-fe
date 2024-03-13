import React from "react";
import { patchArticle } from "../api";

export default function ArticleVoteSection({ votes, article, setArticle }) {
  const handleVote = (article_id, voteType) => {
    setArticle((currArticle) => {
      if (currArticle.article_id === article_id) {
        return {
          ...currArticle,
          votes:
            voteType === "upVote"
              ? currArticle.votes + 1
              : currArticle.votes - 1,
        };
      }
      return currArticle;
    });
    if (voteType === "upVote") {
      patchArticle(article_id, { inc_votes: +1 }).catch((error) => {
        console.log(error.response.data);
        alert("Failed to upvote. Please try again later");
      });
    } else {
      patchArticle(article_id, { inc_votes: -1 }).catch((error) => {
        console.log(error);
        alert("Failed to downvote. Please try again later");
      });
    }
  };
  return (
    <div className="style-vote">
      <button
        onClick={() => {
          handleVote(article.article_id, "upVote");
        }}
        aria-label="Upvote this article"
      >
        ⬆︎
      </button>
      {article.votes}
      <button
        onClick={() => {
          handleVote(article.article_id, "downVote");
        }}
        aria-label="Downvote this article"
      >
        ⬇︎
      </button>
    </div>
  );
}
