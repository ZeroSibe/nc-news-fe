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
  const [comments, setComments] = useState([]);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [errorArticle, setErrorArticle] = useState(null);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ data }) => {
        const article = data.article;
        setArticle(article);
        setIsLoadingArticle(false);
      })
      .catch(({ response }) => {
        const errMsg = response.data.msg;
        setErrorArticle(errMsg);
        setIsLoadingArticle(false);
      });

    getCommentsByArticleID(article_id)
      .then(({ data }) => {
        const comments = data.comments;
        setComments(comments);
        setIsLoadingComments(false);
      })
      .catch(({ response }) => {
        setErrorComments("Comments failed to load");
        setIsLoadingComments(false);
      });
  }, [article_id]);

  if (errorArticle) {
    return <div className="red-text">Error: {errorArticle}</div>;
  }

  if (isLoadingArticle) {
    return <Loading />;
  } else {
    return (
      <main>
        <ArticleStaticSection article={article} />
        <ArticleVoteSection
          votes={article.votes}
          article={article}
          setArticle={setArticle}
        />
        {errorComments ? (
          <div className="red-text">Error: {errorComments}</div>
        ) : (
          <ArticleCommentSection
            isLoadingComments={isLoadingComments}
            comments={comments}
            setComments={setComments}
          />
        )}
      </main>
    );
  }
}
