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
  const { id } = req.params;
  console.log(id);
  res.send();
}

const addCarpool = async (req, res) => {
  try {
    console.log("addcarpool", req.body);
    const { name, from, to, trip, date } = req.body;
    const carpool = new carpoolModel(
      {
        name,
        from,
        to,
        trip,
        date
      }
    )
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

module.exports = {
  getAll,
  getCarpoolById,
  addCarpool,
  addUser
}