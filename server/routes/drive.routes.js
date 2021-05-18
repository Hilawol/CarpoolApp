const express = require('express');
const router = express.Router();
const driveController = require('../controllers/drive.controller');
const auth = require('../middlewares/auth');

router.post('/',auth, (req, res) => {
  driveController.createDrive(req, res);
}).get('/:id/passengers',auth,(req,res)=>{
  driveController.getDrivePassengers(req,res);
}).post('/:id/cars',auth,(req,res)=>{
  driveController.addCar(req,res);
}).get('/:id/cars',auth,(req,res)=>{
driveController.getCars(req,res);
}).patch('/:id/cars/passengers',auth,(req,res)=>{
  driveController.addPassenger(req,res);
})

module.exports = router;
