const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
// const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  usersController.getAllUsers(req, res);
}).post('/', (req, res) => { //Create new user
  usersController.addUser(req, res);
}).post('/login', (req, res) => {
  usersController.loginUser(req, res);
}

);

// .get('/me', auth, (req, res) => {
//   res.send(req.user);
// }).get('/:id', (req, res) => {
//   usersController.getUser(req, res);
// }).post('/login', (req, res) => {
//   usersController.userLogin(req, res);
// }).post('/logout', auth, (req, res) => {
//   usersController.userLogout(req, res);
// }).post('/logoutAll', auth, (req, res) => {
//   usersController.userLogoutAll(req, res);
// }).delete('/me', auth, (req, res) => {
//   usersController.userDeleteMe(req, res);
// });
module.exports = router;