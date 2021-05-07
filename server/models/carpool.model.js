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
      values: ['roundTrip', 'oneWay'],
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
  }

  // drives: [{
  //   from: {
  //     type: String,
  //     required: true,
  //     minLength: 3
  //   },
  //   to: {
  //     type: String,
  //     required: true,
  //     minLength: 3
  //   },
  //   date: {
  //     type: Date,
  //     required: true//TODO:validtae date to be in the future
  //   },
  //   dt: { //dt - departure time
  //     type: Date,
  //     required: true
  //   },
  //   cars: [{
  //     driver: {
  //       name: {
  //         type: String,
  //         required: true,
  //         minLength: 3
  //       }
  //     },
  //     capacity: {
  //       type: Number,
  //       min: 1
  //     },
  //     passengers: []
  //   }]
  // }]
})

const Carpool = mongoose.model('Carpool', carpoolSchema);
module.exports = Carpool;