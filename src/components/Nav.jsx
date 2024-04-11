import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/articles"> Articles</Link>
      <Link to="/topics"> Topics</Link>
      <Link to="/switch_user">Switch User</Link>
    </nav>
  );
}
