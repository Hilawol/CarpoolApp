const userModel = require('../models/users.model');
const passengerModel = require ('../models/passenger.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).json({ "error": error });
  }
}

const getUserProfile = async (req, res) => {
  try {
    await req.user.populate('passengers').execPopulate();
    return res.send(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

const getMyCarpools = async(req,res)=>{
  try {
    await req.user.populate('carpools.carpool').execPopulate();
    return res.send(req.user.carpools);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ "error": "User not found" });
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error });
  }
}

const signupUser = async (req, res) => {
  try {
    const usr = await userModel.findOne({ email: req.body.email })
    if (usr) {
      return res.status(406).json({ "error": "Email already exsits." });
    }
    const { firstName, lastName, email, password } = req.body;
    const user = new userModel({
      firstName,
      lastName,
      email,
      password
    });
     await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error })
  }
}

const loginUser = async (req, res) => {
  try {
    console.log("in loginUser");
    const user = await userModel.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Invalid login credentials" });
  }
}

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
}

const deleteUserProfile = async (req, res) => {
  try {
    await req.user.remove();
   return  res.send(req.user);
  } catch (error) {
    return res.status(500).send();
  }
}

const hila = async (req,res)=>{
  try {
    console.log(req.user);
    // await req.user.populate('carpools.carpool').execPopulate();
    await req.user.populate('passengers').execPopulate();
    console.log("after pop:",req.user);
    res.send(req.user)
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}
// const addPassenger = async(req,res)=>{
//   try {
//     const passenger = req.body;
//     req.user.passengers.push(passenger);
//     await req.user.save();
//     return res.status(201).send(req.user.passengers);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send();
//   }
// }

const addDriveToPassenger = async(req,res)=>{
  try {

    const passengers = req.user.passengers;
    req.body.forEach(p => {
      const pass = passengers.find(element => element._id==p.passenger);
      if (pass){
        p.drives.forEach(d=>{
          pass.drives.push({drive:d});
        })
      }
    });
    await req.user.save();
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

// const getPassengers = async(req,res)=>{
//   try {
//     console.log(req.user);
//     // await req.user.populate('carpools.carpool').execPopulate();

//     await req.user.populate({path:'passengers'}).execPopulate();
//     console.log("after pop:",req.user);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send();
//   }
// }

module.exports = {
  getMyCarpools,
  getUserProfile,
  signupUser,
  loginUser,
  getUser,
  logoutUser,
  deleteUserProfile,
  hila,
  addDriveToPassenger,
  // getPassengers,
}