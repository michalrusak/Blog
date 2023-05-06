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
      <div className="article__break"></div>
      <h1 className="article__title">{title}</h1>
      <p className="article__author">{author}</p>
      <p className="article__date">
        {dateCreated} {hour}:{minuts}
      </p>
      <p className="article__body">{body}</p>
    </div>
  );
};

export default Article;
