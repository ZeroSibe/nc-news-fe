import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

//import style card to section them

export default function ArticleCard({ article }) {
  const parsedDate = Date.parse(article.created_at);
  const formatTimeToNow = formatDistanceToNow(new Date(parsedDate), {
    includeSeconds: true,
    addSuffix: true,
  });
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
        <button>votes: {article.votes}</button>
        <button>comment: {article.comment_count}</button>
      </div>
    </li>
  );
}
