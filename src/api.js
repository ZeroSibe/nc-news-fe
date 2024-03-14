import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-izio.onrender.com/api",
});

export const getAllArticles = () => {
  return newsApi.get("/articles");
};

export const getArticleByID = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const getCommentsByArticleID = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`);
};

export const patchArticle = (article_id, patchBody) => {
  return newsApi.patch(`/articles/${article_id}`, patchBody);
};

/* 201 body request, requires both
 const body = {
      username: "butter_bridge",
      body: "Testing",
    };
    */
//POST /api/articles/:article_id/comments <-- update comments list
// export const postCommentByArticleID = (article_id, postBody) => {
//   return newsApi.post(`/articles/${article_id}/comments`, postBody);
// };
export const postComment = (article_id, postBody) => {
  return fetch(
    `https://nc-news-izio.onrender.com/api/articles/${article_id}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    }
  ).then((res) => {
    return res.json();
  });
};
