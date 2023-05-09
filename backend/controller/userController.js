const User = require("../database/models/User.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const ACCESTOKEN = process.env.ACCESTOKEN;

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const newPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: newPassword,
  });

  if (!user) {
    return res.json({ err: "User didn't created" });
  }

  return res.sendStatus(200);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ err: "Invalid email or password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.sendStatus(401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.sendStatus(401);
  }

  if (isPasswordValid) {
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, ACCESTOKEN, {
      expiresIn: process.env.expireTime,
    });

    return res.status(200).json({ token });
  }
  return res.status(401);
};

const getUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = await jwt.verify(token, ACCESTOKEN);

    const id = await decoded.id;

    const user = await User.findById(id);

    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = await jwt.verify(token, ACCESTOKEN);

    const id = await decoded.id;

    await User.deleteOne(User.findById(id));

    res.json({ text: "Delete succesful" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { register, login, getUser, deleteUser };
