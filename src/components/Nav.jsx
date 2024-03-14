import React from "react";
import { Link } from "react-router-dom";

//map all topics to list
//articles?topic

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/articles"> Articles</Link>
      <Link to="/topics"> Topics</Link>
    </nav>
  );
}
