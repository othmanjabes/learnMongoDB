const mongoose = require("mongoose");

// create schema
const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true , "subCategory name is requrired"],
        unique: [true, "must be unique"],
        minlenght: [2,'to short name subCategory'],
        maxlength:[32,'to long name subCategory']
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String,
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required: [true , "name Category requrired"],
    }
},{timestamps:true})

//create model
module.exports = mongoose.model("subCategory",subCategorySchema)
