const connectDB = require("./database/connectDB.js");

const express = require("express");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
app.use(express.json());
app.set("x-powered-by", false);

app.use("/user", userRoutes);
app.use("/article", articleRoutes);

require("dotenv").config();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is listening at port ${port}`);
    });
    connectDB();
  } catch (err) {
    console.log(err);
  }
};
start();

app.use(express.static(path.join(__dirname, "public")));
