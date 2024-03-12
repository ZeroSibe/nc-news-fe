import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import Nav from "./components/Nav";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <main className="content">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
