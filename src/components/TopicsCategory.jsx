import { getTopics } from "../api";
import React, { useEffect, useState } from "react";

export default function TopicsCategory({ topics, setTopics }) {
  const [topicTypes, setTopicTypes] = useState([]);
  const [resetTopic, setResetTopic] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    getTopics()
      .then(({ data }) => {
        const topicsFromAPI = data.topics.map((topic) => topic.slug);
        setTopicTypes(topicsFromAPI);
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  }, []);

  const handleTopicSelection = (e) => {
    const selectedTopic = e.target.value;
    setTopics(selectedTopic);
  };

  if (error) {
    return <p className="red-text">Error: {error}</p>;
  }

  return (
    <div className="sort-topic">
      <label id="topic-options">Topics:</label>
      <select id="topic-options" onChange={handleTopicSelection}>
        <option value={resetTopic}>All</option>

        {topicTypes.map((topicType) => {
          return (
            <option key={topicType} value={topicType}>
              {topicType}
            </option>
          );
        })}
      </select>
    </div>
  );
}
