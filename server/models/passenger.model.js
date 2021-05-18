const mongoose = require('mongoose');
var validator = require('validator');

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 3
  },
  phone:{

  },
  owner: {
    type:  mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  drives:[{
      type: mongoose.SchemaTypes.ObjectId,
      ref:'Drive'
    }]

})

const Passenger = mongoose.model('Passenger', passengerSchema);
module.exports = Passenger;

