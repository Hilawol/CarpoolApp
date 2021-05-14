const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  drive: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Drive',
    required:true,
  },
  driver: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  capacity: {
    type: Number,
    min: 1,
    max: 7,
    required: true,
  },
  passengers:{
    type:Array,
    default: [],
  }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
