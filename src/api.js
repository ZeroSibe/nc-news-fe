import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-izio.onrender.com/api",
});

//GET /api/articles
export const getAllArticles = () => {
  return newsApi.get("/articles");
};
