const carpoolModel = require('../models/carpool.model');

const getCarpoolById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send();
}

const addCarpool = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const carpool = new carpoolModel(
      {
        name: name
      }
    )
    carpool.save();
    res.send(carpool);
  } catch (error) {

  }

}

module.exports = {
  getCarpoolById,
  addCarpool
}