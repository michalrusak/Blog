const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.URL;

const connectDB = () => {
  return mongoose.connect(url, { useNewUrlParser: true }).then(
    () => {
      console.log("DB connected");
    },
    (err) => {
      console.log("Error: " + err);
    }
  );
};

module.exports = connectDB;
