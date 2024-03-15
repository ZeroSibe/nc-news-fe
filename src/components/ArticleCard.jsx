import React, { useState } from "react";
import { Link } from "react-router-dom";
import { patchArticle } from "../api";
import { formatDistanceToNow } from "date-fns";

export default function ArticleCard({ article, artices, setArticles }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const parsedDate = Date.parse(article.created_at);
  const formattedDate = formatDistanceToNow(new Date(parsedDate), {
    addSuffix: true,
  });

  const handleVote = (article_id, voteType) => {
    setArticles((currArticles) => {
      const updatedArticles = currArticles.map((article) => {
        if (article.article_id === article_id) {
          return {
            ...article,
            votes:
              voteType === "upVote" ? article.votes + 1 : article.votes - 1,
          };
        }
        return article;
      });
      return updatedArticles;
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
    <li className="article-card">
      <p>{article.topic}</p>
      <p>posted {formattedDate}</p>
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>
        <img
          src={article.article_img_url}
          alt={`${article.title}`}
          className="articleCard-image"
        />
      </Link>
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
      <Link to={`/articles/${article.article_id}`}>
        <button>comment: {article.comment_count}</button>
      </Link>
    </li>
  );
}
