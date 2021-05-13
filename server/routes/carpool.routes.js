const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpool.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  carpoolController.getAll(req, res);
}).post('/:id/users', auth, (req, res) => {
  carpoolController.addUser(req, res);
}).get('/:id/users', auth, (req, res) => {
  carpoolController.getAllUsers(req, res);
}).get('/:id', auth, (req, res) => {
  carpoolController.getCarpoolByid(req, res);
}).get('/:id/drives',auth,(req,res)=>{
  carpoolController.getDrives(req,res);
}).post('/:id/drives',auth,(req,res)=>{
  carpoolController.addDrive(req,res);
}).post('/', auth, (req, res) => {
  carpoolController.addCarpool(req, res);
})

module.exports = router;