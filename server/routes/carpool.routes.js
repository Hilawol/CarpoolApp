const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpool.controller');

router.get('/:id', (req, res) => {
  carpoolController.getCarpoolByid(req, res);
}).get('/', (req, res) => {
  carpoolController.getAll(req, res);
}).post('/:id/users', (req, res) => {
  carpoolController.addUser(req, res);
})
  .post('/', (req, res) => {
    carpoolController.addCarpool(req, res);
  })

module.exports = router;