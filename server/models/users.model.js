const mongoose = require('mongoose');
var validator = require('validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    trim: true,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    }
  },
  // password: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minLength: 8,
  //   validate(value) {
  //     if (!validator.isStrongPassword(value)) {
  //       throw new Error('Please provide a strong password. MinLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1');
  //     }
  //   }
  // },
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
})

// //this will be avialable to model instances. Can not be an arrow function!
// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'mysecretstring');
//   user.tokens = user.tokens.concat({ token });//adds to the tokens array
//   await user.save(); //saves the tokens
//   return token;
// }

// //statics available to the model
// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error('unable to login');
//   }
//   console.log(user, email, password);
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error('unable to login');
//   }
//   return user;
// }

// //Hash password before saving it to db.
// userSchema.pre('save', async function (next) {//Can not be arrow function!!!!
//   console.log("pre");
//   const user = this;//the current user being saved.
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();//we must call next at the end,otherwise will hang and not save the user. 
// });

const User = mongoose.model('User', userSchema);
module.exports = User;