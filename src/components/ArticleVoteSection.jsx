import React from "react";
import { patchArticle } from "../api";
import { useState } from "react";

export default function ArticleVoteSection({ votes, article, setArticle }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      patchArticle(article_id, { inc_votes: +1 })
        .then(() => {
          setSuccess("Vote successful!");
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        })
        .catch((error) => {
          const errMsg = "Failed to vote";
          setError(errMsg);
        });
    } else {
      patchArticle(article_id, { inc_votes: -1 })
        .then(() => {
          setSuccess("Vote successful!");
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        })
        .catch((error) => {
          const errMsg = "Failed to vote";
          setError(errMsg);
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
      {error && <p className="red-text">Error: {error}</p>}
      {success && <p className="green-text">{success}</p>}
    </div>
  );
}
