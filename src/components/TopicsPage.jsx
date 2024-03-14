import React, { useEffect, useState } from "react";
import { getTopics } from "../api";
import Loading from "./Loading";

import { Link } from "react-router-dom";

export default function TopicsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [topicSection, setTopicSection] = useState([]);

  useEffect(() => {
    getTopics().then(({ data }) => {
      const topics = data.topics;
      setTopicSection(topics);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {topicSection.map((topic) => {
        return (
          <Link key={topic.slug} to={`/topics/${topic.slug}`}>
            <section className="topic-section">
              <h2>{topic.slug}</h2>
              <p>{topic.description}</p>
            </section>
          </Link>
        );
      })}
    </div>
  );
}
