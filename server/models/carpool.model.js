const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 3
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  trip: {
    type: String,
    enum: {
      values: ['roundtrip', 'oneway'],
      message: '{VALUE} is not supported'
    }
  },
  date: {
    type: Date
  },
  passengers: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: []
  },
  users: {
    type: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }],
    default: []
  },
  // drives:{
  //   type:[{
  //     type: mongoose.SchemaTypes.ObjectId,
  //   ref:'Drive',
  // }],
  drives:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref:'Drive'
  }]
})

const Carpool = mongoose.model('Carpool', carpoolSchema);
module.exports = Carpool;