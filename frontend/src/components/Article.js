import React, { useEffect } from "react";

const Article = (props) => {
  useEffect(() => {
    document.title = "Articles | Blog App";
  });
  // eslint-disable-next-line react/prop-types
  const { id, title, author, body, dateCreated, timeCreated } = props;

  const hour = String(timeCreated).slice(0, 2) * 1 + 2;
  const minuts = String(timeCreated).slice(3);
  return (
    <div key={id} className="article">
      <h1 className="title">{title}</h1>
      <p>{author}</p>
      <p>{body}</p>
      <p>{dateCreated}</p>
      <p>
        {hour}:{minuts}
      </p>
    </div>
  );
};

export default Article;
