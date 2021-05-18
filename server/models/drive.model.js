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

  // passengers:[{
  //   id:{
  //     type: mongoose.SchemaTypes.ObjectId,
  //     unique:true
  //   },
  // }]

},opts);

var opts = {}
opts.toJSON = { virtuals: true }

// driveSchema.virtual('passengers',{
//   ref:'Passenger',
//   localField:'_id',
//   foreignField:'drives.drive'
// })

driveSchema.virtual('cars',{
  ref:'Car',
  localField:'_id',
  foreignField:'drive'
})

// driveSchema.virtual('passengers',{
//   ref:'User',
//   localField:'_id',
//   foreignField:'passengers.drives.drive'
// })

const Drive = mongoose.model('Drive', driveSchema);
module.exports = Drive;