const User = require("../database/models/User.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const ACCESTOKEN = process.env.ACCESTOKEN;

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(firstname, lastname, email, password);

  const newPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: newPassword,
  });

  if (!user) {
    return res.json({ err: "user nie zostal stworzony" });
  }

  return res.sendStatus(200);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.json({ err: "brak emiala lub hasla" });
  }

  const user = await User.findOne({ email });
  // console.log(user);

  if (!user) {
    return res.sendStatus(401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, ACCESTOKEN, {
      expiresIn: process.env.expireTime,
    });

    return res.status(200).json({ token, name: user.name });
  }
  return res.status(401);
};

const logout = async () => {};

const getUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = await jwt.verify(token, ACCESTOKEN);

    const id = await decoded.id;

    console.log(id);

    const user = await User.findById(id);

    console.log(user.firstname, user.lastname, user.email);

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
  console.log("delete user");

  const token = req.headers["x-access-token"];
  try {
    const decoded = await jwt.verify(token, ACCESTOKEN);

    const id = await decoded.id;

    console.log(id);

    await User.deleteOne(User.findById(id));

    res.json({ text: "delete succesful" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { register, login, logout, getUser, deleteUser };
