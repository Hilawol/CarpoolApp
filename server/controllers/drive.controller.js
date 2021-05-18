const driveModel = require('../models/drive.model');
const carModel = require('../models/car.model');
const userModel = require('../models/users.model');
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

    await drive.populate({path:'cars', populate:{path:'driver'}}).execPopulate();
    return res.send(drive.cars);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const getCars = async(req,res)=>{
  try {
    const driveId = req.params.id;
    let drive;
    try {
       drive = await driveModel.findById(driveId).populate({path:'cars',
      populate:{
        path:'driver'
      }});
         return res.send(drive.cars);
    } catch (error) {
      console.log(error);
      return res.status(404).send();
    }
    
    // await drive.populate('driver').execPopulate();
    // res.send(drive.cars);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const getDrivePassengers = async(req,res)=>{
  try {
    console.log("getting passengers for dirve");
    const driveId = req.params.id;
    
    try {

      let drive = await driveModel.findById("60a294342d8af08561865bce");
      console.log(drive);
      await drive.populate({path:'passengers'}).execPopulate();
      // await drive.populate({path:'cars', populate:{path:'driver'}}).execPopulate();
      // //  drive = await driveModel.findById(driveId).populate({path:'passengers'});
      //  drive = await driveModel.findById(driveId);
      //  await drive.populate({path:'passengers'}).execPopulate();
      //  console.log("drive:",drive);
      // //  console.log(drive);
      // return res.json({drive:drive});
      // console.log(driveId)
      // await userModel.findOne({ _id: decoded._id, 'tokens.token': token });
      // const pass = await userModel.findOne({'passengers.name':'Eden Kershenovich'});
      // console.log(pass)
     return res.send(drive);
     
    } catch (error) {
      console.log(error);
      return res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  createDrive,
  addCar,
  getCars,
  getDrivePassengers
}