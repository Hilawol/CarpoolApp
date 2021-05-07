const carpoolModel = require('../models/carpool.model');
const usersModel = require('../models/users.model');


const getAll = async (req, res) => {
  try {
    const carpools = await carpoolModel.find({});
    res.send(carpools);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error })
  }
}

const getCarpoolById = async (req, res) => {
  console.log("getCarpoolById");
  const { id } = req.params;
  console.log(id);
  res.send();
}

const addCarpool = async (req, res) => {
  try {
    console.log("addcarpool", req.body);
    const carpool = new carpoolModel({
      ...req.body,
      owner: req.user._id
    })
    carpool.save();
    res.status(201).json(carpool);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error })
  }
}

const addUser = async (req, res) => {
  try {
    const carpoolId = req.params.id;
    const { userId } = req.body;
    let carpool, user;
    try {
      carpool = await carpoolModel.findById(carpoolId);
      user = await usersModel.findById(userId);
    } catch (error) {
      res.status(404).send();
    }
    carpool.users.push(userId);
    carpool.save();
    res.send(user);
  } catch (error) {
    res.status(500).json({ "error": error });
  }
}

const getAllUsers = async (req, res) => {
  console.log("getAllusers");
  try {
    const carpoolId = req.params.id;
    try {
      carpool = await carpoolModel.findById(carpoolId);
    } catch (error) {
      res.status(404).send();
    }
    res.json({ "users": carpool.users });
  } catch (error) {

  }
}

module.exports = {
  getAll,
  getCarpoolById,
  addCarpool,
  addUser,
  getAllUsers
}