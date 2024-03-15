import React from "react";
import { UserContext } from "../contexts/User";
import { useContext } from "react";

export default function UserCard({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <li className="user-card">
      <h3>{user.username}</h3>
      <img
        className="avatar-img"
        src={user.avatar_url}
        alt={`${user.username}`}
      ></img>
      {loggedInUser.username === user.username ? (
        <button
          onClick={() => {
            setLoggedInUser(user);
          }}
          className="logout-button"
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={() => {
            setLoggedInUser(user);
          }}
          className="login-button"
        >
          Login
        </button>
      )}
    </li>
  );
}
