const mongoose = require('mongoose');
var validator = require('validator');

const passengerSchema = new mongoose.Schema({

 
    name:{
      type:String,
      trim:true,
      minLength:2,
      required:true,
    },
    phone:{
      type:String,
      trim:true,
      validtae(value){
        if(!validator.isMobilePhone(mobilePhone.trim(), "he-IL")){
          throw new Error('Invalid phone number');
        }
      }
    },
    owner: {
      type:  mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User'
    },
    drives:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Drive',
        required:true
    }]

})

const Passenger = mongoose.model('Passenger', passengerSchema);
module.exports = Passenger;

