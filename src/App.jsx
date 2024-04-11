import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import Nav from "./components/Nav";
import { useState } from "react";
import { UserContext } from "./contexts/User";
import TopicsPage from "./components/TopicsPage";
import SingleTopic from "./components/SingleTopic";
import ErrorPage from "./components/ErrorPage";
import SwitchUser from "./components/SwitchUser";
import HomePage from "./components/HomePage";

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/87.svg",
  });
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Header />
      <Nav />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic" element={<SingleTopic />} />
          <Route path="/switch_user" element={<SwitchUser />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
