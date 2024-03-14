import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getArticlesByTopic } from "../api";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";

export default function SingleTopic() {
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticlesByTopic(topic)
      .then(({ data }) => {
        const articles = data.articles;
        console.log(articles);
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error.status}</p>;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="ArticlefromTopics-container">
      <ul>
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
              setArticles={setArticles}
            />
          );
        })}
      </ul>
    </div>
  );
}
