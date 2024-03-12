import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../api";
import Loading from "./Loading";
import ArticleStaticSection from "./ArticleStaticSection";
import ArticleVoteSection from "./ArticleVoteSection";
import ArticleCommentSection from "./ArticleCommentSection";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ data }) => {
        const article = data.article;
        console.log(article);
        setArticle(article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [article_id]);
  return isLoading ? (
    <Loading />
  ) : (
    <main>
      <ArticleStaticSection article={article} />
      <ArticleVoteSection votes={article.votes} />
      <ArticleCommentSection />
    </main>
  );
}
