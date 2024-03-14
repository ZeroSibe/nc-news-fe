import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <header className="header">
      <h1>NC News</h1>
      <div className="loggedIn-container">
        <img src={loggedInUser.avatar_url} className="loggedIn-img" />
        <p className="loggedIn-username">{loggedInUser.username}</p>
      </div>
    </header>
  );
}
