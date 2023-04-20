const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  body: String,
  authorId: {
    type: [mongoose.Schema.Types.ObjectId],
    refPath: "User",
  },
  author: String,
  createdAt: { type: Date, default: Date.now },
  updateAt: Date,
});

module.exports = mongoose.model("Article", ArticleSchema);
