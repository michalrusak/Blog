const Article = require("../database/models/Article.js");
const User = require("../database/models/User.js");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const ACCESTOKEN = process.env.ACCESTOKEN;

const getArticles = async (req, res) => {
  // const token = req.headers["x-access-token"];
  // let UserId;

  // if (token) {
  //   const decoded = await jwt.verify(token, ACCESTOKEN);

  //   UserId = await decoded.id;
  // }
  try {
    const articles = await Article.find();

    const newArticles = articles.map((elem) => {
      // let edit = false;
      // if (elem.authorId[0] == UserId) {
      //   edit = true;
      //   console.log("id true");
      // }
      return {
        id: elem.id,
        title: elem.title,
        body: elem.body,
        author: elem.author,
        createdAt: elem.createdAt,
        // edit: edit,
        // aid: elem.authorId[0],
      };
    });
    res.json({ articles: newArticles });
  } catch (error) {
    return res.status(401);
  }
};

const createArticle = async (req, res) => {
  const token = await req.headers["x-access-token"];

  const { title, text } = await req.body;

  let UserId;
  try {
    if (token) {
      const decoded = await jwt.verify(token, ACCESTOKEN);

      UserId = await decoded.id;
    }

    const ObjectId = require("mongodb").ObjectId;
    const Id = new ObjectId(UserId);

    const user = await User.findById(UserId);

    const article = await Article.create({
      title: title,
      body: text,
      author: user.firstname + " " + user.lastname,
      authorId: Id,
    });

    if (!article) {
      return res.json({ err: "nie utworzono" });
    }

    res.json({ info: "Ok" });
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
};

const updateArticle = async () => {};

const deleteArticle = async () => {};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };
