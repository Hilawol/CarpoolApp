const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpool.controller');
const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
  carpoolController.getAll(req, res);
}).post('/:id/users', (req, res) => {
  carpoolController.addUser(req, res);
}).get('/:id/users', (req, res) => {
  carpoolController.getAllUsers(req, res);
}).get('/:id', (req, res) => {
  carpoolController.getCarpoolByid(req, res);
}).post('/', auth, (req, res) => {
  carpoolController.addCarpool(req, res);
})

module.exports = router;