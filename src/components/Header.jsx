import React from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <menu className="nav">
      <Link to="/articles">All Articles</Link>
    </menu>
  );
};

export default function Header() {
  return (
    <header className="header">
      <h1>NC News</h1>
      <NavMenu />
    </header>
  );
}
