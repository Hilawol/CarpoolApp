const carpoolModel = require('../models/carpool.model');

const getCarpoolById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send();
}

const addCarpool = async (req, res) => {
  try {
    console.log("addcarpool")
    const { name, from, to, date } = req.body;
    const carpool = new carpoolModel(
      {
        name,
        from,
        to,
        date: new Date(date)
      }
    )
    carpool.save();
    res.status(201).json(carpool);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error })
  }
}

module.exports = {
  getCarpoolById,
  addCarpool
}