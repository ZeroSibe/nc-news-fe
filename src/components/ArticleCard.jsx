import React from "react";

//will add link to article.id

export default function ArticleCard({ article }) {
  const parsedDate = Date.parse(article.created_at);
  const formattedDate = new Date(parsedDate).toLocaleString("en-GB", {
    timeZone: "UTC",
  });
  console.log(formattedDate);
  return (
    <li>
      <p>{article.topic}</p>
      <p>posted on {formattedDate}</p>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={`${article.title}`} />
      <div className="style-vote">
        <button>votes: {article.votes}</button>
        <button>comment: {article.comment_count}</button>
      </div>
    </li>
  );
}
