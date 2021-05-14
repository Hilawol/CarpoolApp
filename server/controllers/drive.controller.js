const driveModel = require('../models/drive.model');
const carModel = require('../models/car.model');
const { populate } = require('../models/drive.model');

const createDrive = async (req, res) => {
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
    const driveId = req.params.id;
    const {capacity} =req.body;
    const driverId =  req.user._id;

    if(!(capacity>0 && capacity<=7)){
      return res.status(400).json({error:"Invalid capacity. Capacity should be a number in range: 1-7"});
    }

    let dirve;
    try {
       drive = await driveModel.findById(driveId);
    } catch (error) {
      return res.status(404).send();
    }
    
    const car = new carModel({
      driver:driverId,
      drive:driveId,
      capacity,
    })

    await car.save();
    await drive.populate('cars').execPopulate();
    return res.send(drive.cars);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const getCars = async(req,res)=>{
  try {
    console.log("getCars")
    const driveId = req.params.id;
    let drive;
    try {
       drive = await driveModel.findById(driveId).populate({path:'cars',
      populate:{
        path:'driver'
      }});
    } catch (error) {
      console.log(error);
      return res.status(404).send();
    }
    console.log("1",drive);
    await drive.populate('driver').execPopulate();
    // console.log("2",drive)
    // await drive.populate('driver').execPopulate();
    // console.log("3",drive)
    res.send(drive.cars);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  createDrive,
  addCar,
  getCars
}