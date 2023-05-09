const express = require("express");
const router = express.Router();

const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/articleController");

router.route("/").get(getArticles);

router.route("/newarticle").post(createArticle);

router.route("/:id").patch(updateArticle).delete(deleteArticle);

module.exports = router;
