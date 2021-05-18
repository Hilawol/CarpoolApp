const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth');

router.get('/me', auth, (req, res) => {
  usersController.getUserProfile(req, res);
}).delete('/me', auth, (req, res) => {
  usersController.deleteUserProfile(req, res);

}).get('/hila',auth,(req,res)=>{
  usersController.hila(req,res);
})

.get('/me/carpools',auth,(req,res)=>{
  usersController.getMyCarpools(req,res);
}).post('/me/passengers/drives',auth,(req,res)=>{
  usersController.addDriveToPassenger(req,res);
}).post('/signup', (req, res) => { //Create new user
  usersController.signupUser(req, res);
}).post('/login', (req, res) => {
  usersController.loginUser(req, res);
}).post('/logout', auth, (req, res) => {
  usersController.logoutUser(req, res);
});


// .post('/me/passengers',auth,(req,res)=>{
//   usersController.addPassenger(req,res);
// })

module.exports = router;