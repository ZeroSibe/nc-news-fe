import React from "react";
//use PATCH /api/articles/:article_id to update votes
//if article id is clicked update article votes
//state article needs to be passed here instead of just votes

export default function ArticleVoteSection({ votes }) {
  console.log(votes);
  return <button>Votes: {votes}</button>;
}
