import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../components/Article";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  let token;
  useEffect(() => {
    document.title = "Articles | Blog App";
    token = localStorage.getItem("token");
    getArticles();
  }, []);

  const getArticles = () => {
    axios
      .get("/article", {
        headers: {
          "x-access-token": token,
        },
      })
      .then(function (res) {
        setArticles(res.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showArticles = articles.map((article) => (
    <Article
      key={article.id}
      title={article.title}
      body={article.body}
      author={article.author}
      dateCreated={article.createdAt.slice(0, 10)}
      timeCreated={article.createdAt.slice(11, 16)}
      edit={article.edit}
    />
  ));

  showArticles.reverse();

  return (
    <div className="articles">
      <a href="/addarticle" className="articles__button">
        Add article
      </a>
      <h1 className="articles__title">
        {articles ? "Articles" : "No articles"}
      </h1>
      <div className="articles__container">{showArticles}</div>
    </div>
  );
};

export default Articles;
