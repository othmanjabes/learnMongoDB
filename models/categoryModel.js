const mongoose = require("mongoose");

// create schema
const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true , "Category name is requrired"],
    unique: [true, "must be unique"],
    minlenght: [2,'to short name Category'],
    maxlength:[32,'to long name Category']
},
  slug:{
    type: String,
    lowercase: true
  },
  image:String,
},{timestamps:true});

// create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;