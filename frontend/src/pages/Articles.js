import React from "react";

const Articles = () => {
  const articles = false;
  return (
    <div className="articles">
      <a href="/addarticle" className="articles__button">
        Add article
      </a>
      <h1 className="articles__title">
        {articles ? "Articles" : "No articles"}
      </h1>
    </div>
  );
};

export default Articles;
