const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  carpools: [{
    carpool: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Carpool',
    },
    owner: {
      type: Boolean,
    }
  }],
  passengers: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Passenger',
    }],
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error('Please provide a strong password. MinLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

// //this will be avialable to model instances. Can not be an arrow function!
userSchema.methods.generateAuthToken = async function () {//instance method
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'mysecretstring');
  user.tokens = user.tokens.concat({ token });//adds to the tokens array
  await user.save(); //saves the tokens
  return token;
}

// //statics available to the model
userSchema.statics.findByCredentials = async (email, password) => {//model methods
  try {
    console.log("will search user");
    const user = await User.findOne({ email: email });
    console.log("found user:", user);
    if (!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("password match", isMatch);
    if (!isMatch) {
      throw new Error('Unable to login');
    }
    return user;
  } catch (error) {
    console.log(error)
  }

}

//Hash password before saving it to db.
userSchema.pre('save', async function (next) {
  const user = this;//the current user being saved.
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();//we must call next at the end,otherwise will hang and not save the user. 
});

const User = mongoose.model('User', userSchema);
module.exports = User;