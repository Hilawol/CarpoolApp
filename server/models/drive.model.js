const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  carpool: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Carpool',
  },
  type: {
    type: String,
    values: ['inbound', 'outbound'],
    message: '{VALUE} is not supported'
  },
  from: {
    type: String,
    trim: true,
    minLength: 2,
  },
  to: {
    type: String,
    trim: true,
    minLength: 2,
  },
  cars: [{
    driver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    capacity: {
      type: Number,
      min: 1,
      max: 8,
      required: true,
    },
    passengers: [],
    default: [],
  }],
  passenger: {
    type: Array,
    default: []
  }
});

const Drive = mongoose.model('Drive', driveSchema);
module.exports = Drive;