const mongoose = require("mongoose");

// create schema
const brandSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true , "brand name is requrired"],
    unique: [true, "must be unique"],
    minlenght: [2,'to short name brand'],
    maxlength:[32,'to long name brand']
},
  slug:{
    type: String,
    lowercase: true
  },
  image:String,
},{timestamps:true});

// create model
const brandModel = mongoose.model('brand', brandSchema);

module.exports = brandModel;