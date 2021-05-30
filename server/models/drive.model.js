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
  date:{
    type:Date,
    required:true,
    validate(value){
      if(!value>new Date()){
        throw new Error('Invalid date');
      }
    }
  },
},opts);

var opts = {}
opts.toJSON = { virtuals: true }

driveSchema.virtual('cars',{
  ref:'Car',
  localField:'_id',
  foreignField:'drive'
})

const Drive = mongoose.model('Drive', driveSchema);
module.exports = Drive;