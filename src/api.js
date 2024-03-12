import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-izio.onrender.com/api",
});

//GET /api/articles
export const getAllArticles = () => {
  return newsApi.get("/articles");
};

//GET /api/articles/:article_id
export const getArticleByID = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

//GET /api/articles/:article_id/comments <-- populate comments list
export const getCommentsByArticleID = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`);
};

//PATCH /api/articles/:article_id <--update votes

//POST /api/articles/:article_id/comments <-- update comments list
