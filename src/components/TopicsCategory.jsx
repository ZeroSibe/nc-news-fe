import { getTopics } from "../api";
import React, { useEffect, useState } from "react";

export default function TopicsCategory({ topics, setTopics }) {
  const [topicTypes, setTopicTypes] = useState([]);
  const [resetTopic, setResetTopic] = useState("");
  useEffect(() => {
    getTopics().then(({ data }) => {
      const topicsFromAPI = data.topics.map((topic) => topic.slug);
      console.log(topicsFromAPI);
      setTopicTypes(topicsFromAPI);
    });
  }, []);

  const handleTopicSelection = (e) => {
    //set State from article list
    console.log(e.target.value);
    const selectedTopic = e.target.value;
    setTopics(selectedTopic);
  };

  return (
    <select id="topic-options" onChange={handleTopicSelection}>
      <option value={resetTopic}>Filter Topic</option>

      {topicTypes.map((topicType) => {
        return (
          <option key={topicType} value={topicType}>
            {topicType}
          </option>
        );
      })}
    </select>
  );
}
