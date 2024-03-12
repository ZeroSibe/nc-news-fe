import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID, getCommentsByArticleID } from "../api";
import Loading from "./Loading";
import ArticleStaticSection from "./ArticleStaticSection";
import ArticleVoteSection from "./ArticleVoteSection";
import ArticleCommentSection from "./ArticleCommentSection";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const promises = [
      getArticleByID(article_id),
      getCommentsByArticleID(article_id),
    ];
    Promise.all(promises)
      .then((returnPromises) => {
        const article = returnPromises[0].data.article;
        const comments = returnPromises[1].data.comments;
        setArticle(article);
        setComments(comments);
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
      <ArticleCommentSection comments={comments} />
    </main>
  );
}
