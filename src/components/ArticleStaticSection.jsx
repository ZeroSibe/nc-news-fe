import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleStaticSection({ article }) {
  const parsedDate = Date.parse(article.created_at);
  const formattedDate = new Date(parsedDate).toLocaleString("en-GB", {
    timeZone: "UTC",
  });
  return (
    <section>
      <p>
        Posted by {article.author} on {formattedDate}
      </p>
      <h2>{article.title}</h2>
      <img
        src={article.article_img_url}
        alt={`${article.title}`}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </section>
  );
}
