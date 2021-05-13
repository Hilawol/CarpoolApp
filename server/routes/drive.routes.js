const express = require('express');
const router = express.Router();
const driveController = require('../controllers/drive.controller');
const auth = require('../middlewares/auth');

router.post('/',auth, (req, res) => {
  driveController.createDrive(req, res);
}).patch('/:id/cars',auth,(req,res)=>{
  driveController.addCar(req,res);
}).patch('/:id/cars/passengers',auth,(req,res)=>{
  driveController.addPassenger(req,res);
})

module.exports = router;
