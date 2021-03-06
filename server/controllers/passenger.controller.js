const { Mongoose } = require('mongoose');
const Passenger = require('../models/passenger.model');
const passengerModel = require('../models/passenger.model');

const createPassenger= async (req,res)=>{
  try {
   const {name,phone}=req.body;
  const owner=req.user._id;

  //Avoids repetitve passenger with same name for user owner. 
   const pass = await passengerModel.findOne({name:name,owner:owner});
   if (pass){
     return res.status(409).send();
   }
    const passenger = new passengerModel({
      name,
      phone,
      owner,
    })
    
    await passenger.save()
    req.user.passengers.push(passenger._id);
    await req.user.save();
    res.send(passenger);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

const addDrive =async (req,res)=>{
try {
  const id = req.params.id;
  const driveId = req.body.drive;
  const passenger = await passengerModel.findById(id);
  passenger.drives.push(driveId);
  await passenger.save();
  res.send(passenger.drives);
} catch (error) {
  console.log(error);
    return res.status(500).send();
}}

const getPassengers = async(req,res)=>{
  try {
    const driveId = req.params.id;
    const passengers = await passengerModel.find({ drives :  driveId });
    res.send(passengers);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

const getOwnerPassengers = async (req,res)=>{
  try {
    const ownerId = req.params.id;
    const passengers = await passengerModel.find({ owner :  ownerId });
    res.send(passengers);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

const AddPassengersToDrive = async (req,res)=>{
  try {
    const data = req.body;
    for(let i=0;i<data.length;i++){
      const passenger = await passengerModel.findById(data[i].passenger);
      for(let j=0;j<data[i].drives.length;j++){
        passenger.drives.push(data[i].drives[j]);
        await passenger.save();
      }
    }
    console.log(req.body);
    res.send();
  } catch (error) {
    
  }
}

module.exports ={
  createPassenger,
  addDrive,
  getPassengers,
  getOwnerPassengers,
  AddPassengersToDrive
}

