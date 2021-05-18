const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, (req, res) => {
  passengerController.createPassenger(req, res);//Adds a new passenger
}).post('/:id/drive',auth,(req,res)=>{
  passengerController.addDrive(req, res);//Adds drive to passenger id
}).get('/drive/:id',auth,(req,res)=>{
  passengerController.getPassengers(req,res);//Gets passengers of drive id
}).post('/drives/',auth,(req,res)=>{
  passengerController.AddPassengersToDrive(req,res);//Adds passengers to drives
}).get('/owner/:id',auth,(req,res)=>{
  passengerController.getOwnerPassengers(req,res);
})

module.exports = router;