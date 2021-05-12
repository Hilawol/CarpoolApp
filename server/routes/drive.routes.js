const express = require('express');
const router = express.Router();
const driveController = require('../controllers/drive.controller');
const auth = require('../middlewares/auth');

router.post('/',auth, (req, res) => {
  driveController.addDrive(req, res);
}).patch('/:id/cars',auth,(req,res)=>{
  driveController.addCar(req,res);
}).patch('/:id/cars/passengers',auth,(req,res)=>{
  driveController.addPassenger(req,res);
})

module.exports = router;


// .get('/', auth, (req, res) => {
//   driveController.getAll(req, res);
// }).post('/:id/users', auth, (req, res) => {
//   driveController.addUser(req, res);
// }).get('/:id/users', auth, (req, res) => {
//   driveController.getAllUsers(req, res);
// }).get('/:id', auth, (req, res) => {
//   driveController.getCarpoolByid(req, res);
// })