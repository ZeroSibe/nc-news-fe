import React from "react";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { useContext } from "react";
import ArticleCard from "./ArticleCard";
import { getArticlesByAuthor } from "../api";

export default function HomePage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticlesByAuthor()
      .then(({ data }) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Opps...Something went wrong...");
        setIsLoading(false);
      });
  }, []);

  return (
    <main>
      <h1 className="page-titles">Welcome back {loggedInUser.username}! </h1>
      <h2 className="page-titles"> Here's Your Top Post </h2>
      {isLoading ? (
        <p>Please wait while we load your articles...</p>
      ) : articles.length === 0 ? (
        <p> Looks like you have not posted an article</p>
      ) : (
        <ul>
          {articles.map((article) => {
            if (article.author === loggedInUser.username) {
              return <ArticleCard key={article.article_id} article={article} />;
            }
          })}
        </ul>
      )}
      {error && <p className="red-text"> {error}</p>}
    </main>
  );
}
