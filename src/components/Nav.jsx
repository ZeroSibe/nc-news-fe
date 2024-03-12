import React from "react";
import { Link } from "react-router-dom";

//map all topics to list

export default function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/articles">All Articles</Link>
        </li>
      </ul>
    </nav>
  );
}
