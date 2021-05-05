const userModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).json({ "error": error });
  }
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

const addUser = async (req, res) => {
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
    // const token = await user.generateAuthToken();
    const result = await user.save();
    // return res.status(201).json({ user, token });
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error })
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Invalid login credentials" });
  }
}

module.exports = {
  getAllUsers,
  addUser,
  loginUser,
  getUser
}