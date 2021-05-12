const driveModel = require('../models/drive.model');
const userModel = require('../models/users.model');


const addDrive = async (req, res) => {
  try {
    console.log("addDrive")
    const drive = new driveModel({
      ...req.body,
    })
    await drive.save();
    return res.send(drive);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

const addCar = async(req,res)=>{
  try {
    const carpoolId = req.params.id;
    const {capacity} =req.body;
    const driverId =  req.user._id;
    const car = {
      driver:driverId,
      capacity,
    }
    const carpool = await driveModel.findById(carpoolId);
    carpool.cars.push(car);
    carpool.save();
    return res.send({carpool,driverId});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  
  }
}

module.exports = {
  addDrive,
  addCar
}