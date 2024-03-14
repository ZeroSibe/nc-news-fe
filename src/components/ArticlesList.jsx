import { useEffect, useState } from "react";
import React from "react";
import { getAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import TopicsCategory from "./TopicsCategory";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState("");

  useEffect(() => {
    getAllArticles(topics)
      .then(({ data }) => {
        const articles = data.articles;
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topics]);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <TopicsCategory topics={topics} setTopics={setTopics} />
      <section>
        <ul>
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                setArticles={setArticles}
                articles={articles}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
