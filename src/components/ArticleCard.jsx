import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { patchArticle } from "../api";

//import style card to section them
//minus vote button to be added

export default function ArticleCard({ article, articles, setArticles }) {
  const parsedDate = Date.parse(article.created_at);
  const formatTimeToNow = formatDistanceToNow(new Date(parsedDate), {
    includeSeconds: true,
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
    <li className="article-card">
      <p>{article.topic}</p>
      <p>posted {formatTimeToNow}</p>
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
      </div>
      <button>comment: {article.comment_count}</button>
    </li>
  );
}
