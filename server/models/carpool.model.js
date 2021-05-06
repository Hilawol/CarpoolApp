const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 3
  },
  owner: {
    id: mongoose.SchemaTypes.ObjectId
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  date: {
    type: Date
  },
  passengers: {
    type: [mongoose.SchemaTypes.ObjectId],
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