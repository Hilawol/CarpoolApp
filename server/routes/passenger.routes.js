const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, (req, res) => {
  passengerController.addPassenger(req, res);
}).post('/:id/drive',(req,res)=>{
  passengerController.addDrive(req, res);
}).get('/drive/:id',(req,res)=>{
  passengerController.getPassengers(req,res);
})

module.exports = router;