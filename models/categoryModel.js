const mongoose = require("mongoose");

// create schema
const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true , "Category requrired"],
    unique: [true, "must be unique"],
    minlenght: 3,
    maxlength:32
  },
  slug:{
    type: String,
    lowercase: true
  },
  image:String,
},{timestamps:true});

// create model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;