import React from "react";

export default function ArticleStaticSection({ article }) {
  const parsedDate = Date.parse(article.created_at);
  const formattedDate = new Date(parsedDate).toLocaleString("en-GB", {
    timeZone: "UTC",
  });
  return (
    <section className="article-section">
      <p>
        Posted by {article.author} on {formattedDate}
      </p>
      <h2>{article.title}</h2>
      <img
        src={article.article_img_url}
        alt={`${article.title}`}
        className="article-image"
      />
      <p>{article.body}</p>
    </section>
  );
}
