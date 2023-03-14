const mongoose = require('mongoose')

const MediSchema = new mongoose.Schema({
  drug: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  time: {
    type:Number,
    required:true,
  },
  running:{
    type: Boolean,
    required: true,
  }
 
})

module.exports = mongoose.model('Medi', MediSchema)
