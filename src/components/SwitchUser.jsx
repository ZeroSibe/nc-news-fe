import React, { useEffect } from "react";
import { useState } from "react";

import { getAllUsers } from "../api";
import UserCard from "./UserCard";

export default function SwitchUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
      .then((res) => {
        setUsers(res.data.users);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Opps...Something went wrong...");
        setIsLoading(false);
      });
  }, []);

  return (
    <main>
      <h2 className="page-titles">Select a User</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="users-container">
          {users.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
        </ul>
      )}
      {error && <p className="red-text"> {error}</p>}
    </main>
  );
}
