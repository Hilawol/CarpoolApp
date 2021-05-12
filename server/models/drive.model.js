const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  carpool: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Carpool',
    required:true,
  },
  type: {
    type: String,
    enum: ['inbound', 'outbound'],
    message: '{VALUE} is not supported',
    required:true,
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
      max: 10,
      required: true,
    },
    passengers:{
      type:Array,
      default: [],
    },
  }],
  passenger: {
    type: Array,
    default: []
  }
});

const Drive = mongoose.model('Drive', driveSchema);
module.exports = Drive;