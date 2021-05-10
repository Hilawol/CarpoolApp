const userModel = require('../models/users.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).json({ "error": error });
  }
}

const getUserProfile = async (req, res) => {
  await req.user.populate('carpools.carpool').execPopulate();
  console.log(req.user.carpools);
  return res.send(req.user);
}

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ "error": "User not found" });
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error });
  }
}

const signupUser = async (req, res) => {
  try {
    const usr = await userModel.findOne({ email: req.body.email })
    if (usr) {
      return res.status(406).json({ "error": "Email already exsits." });
    }
    const { firstName, lastName, email, password } = req.body;
    const user = new userModel({
      firstName,
      lastName,
      email,
      password
    });
    const result = await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error })
  }
}

const loginUser = async (req, res) => {
  try {
    console.log("in loginUser");
    const user = await userModel.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Invalid login credentials" });
  }
}

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
}

const deleteUserProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  getUserProfile,
  signupUser,
  loginUser,
  getUser,
  logoutUser,
  deleteUserProfile
}