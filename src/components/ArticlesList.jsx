import { useEffect, useState } from "react";
import React from "react";
import { getAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import TopicsCategory from "./TopicsCategory";
import { useSearchParams } from "react-router-dom";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getAllArticles(topics, sortBy, order)
      .then(({ data }) => {
        const articles = data.articles;
        setArticles(articles);
        setSearchParams({ topics: topics, sortBy: sortBy, order: order });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topics, sortBy, order]);

  const handleOrder = (e) => {
    e.preventDefault();
    order === "desc" ? setOrder("asc") : setOrder("desc");
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="sort-container">
        <TopicsCategory topics={topics} setTopics={setTopics} />

        <div className="sort-articles">
          <label>Sort By: </label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="created_at">Date Posted</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className="toggle-order">
          <label>Order By:</label>
          <button onClick={handleOrder}>{order}</button>
        </div>
      </div>
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
