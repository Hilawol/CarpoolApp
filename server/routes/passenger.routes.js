const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, (req, res) => {
  passengerController.addPassenger(req, res);
}).post('/:id/drive',auth,(req,res)=>{
  passengerController.addDrive(req, res);
}).get('/drive/:id',auth,(req,res)=>{
  passengerController.getPassengers(req,res);
}).get('/owner/:id',auth,(req,res)=>{
  passengerController.getOwnerPassengers(req,res);
})

module.exports = router;