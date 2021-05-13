const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth');

router.get('/me', auth, (req, res) => {
  usersController.getUserProfile(req, res);
}).get('/me/carpools',auth,(req,res)=>{
  usersController.getMyCarpools(req,res);
}).delete('/me', auth, (req, res) => {
  usersController.deleteUserProfile(req, res);
}).post('/signup', (req, res) => { //Create new user
  usersController.signupUser(req, res);
}).post('/login', (req, res) => {
  usersController.loginUser(req, res);
}).post('/logout', auth, (req, res) => {
  usersController.logoutUser(req, res);
});

// }).delete('/me', auth, (req, res) => {
//   usersController.userDeleteMe(req, res);
// });
module.exports = router;