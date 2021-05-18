const { Mongoose } = require('mongoose');
const Passenger = require('../models/passenger.model');
const passengerModel = require('../models/passenger.model');

const addPassenger= async (req,res)=>{
  try {
   const {name,owner}=req.body;
    const passenger = new passengerModel({
      name,
      owner
    })
    await passenger.save()
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

module.exports ={
  addPassenger,
  addDrive,
  getPassengers
}

