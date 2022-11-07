const CategoryModel = require("../models/categoryModel");
const slugify = require('slugify')
const asyncHundler = require('express-async-handler');
const ApiError = require("../utils/ApiError");

// @disc Get list of category
// @route Get
// @access public
exports.getCategories = asyncHundler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({result: categories.length,page, data:categories})
});

// @ disc   Get spicefic category
// @ route  GET /api/v1/categories/:id
// @ access public
exports.getCategory = asyncHundler(async(req, res,next) => {
  const {id} = req.params;
  const category = await CategoryModel.findById(id);
  console.log("log>>>: ",category,' >>> id: ',id);
  if(category === null){
    res.status(404).json({msg: "NO category found get category"})
    //return next(new ApiError("NO category get category !>?!?!?<!",404))
  }
  res.status(200).json({data:category})
});

// @disc create category
// @route POST /api/v1/categories
// @access Private 
exports.createCategory = asyncHundler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({name,slug:slugify(name)})
  res.status(201).json({data:category})
});

// @ disc   update specific category
// @ route  PUT /api/v1/categories/:id
// @ access Private

exports.updateCategory = asyncHundler(async(req,res)=>{
  const {id} = req.params;
  const {name} = req.body;
  const category = await CategoryModel.findByIdAndUpdate({_id:id},{name ,slug:slugify(toString(name))},{new:true});
  if(!category){
    res.status(404).json({msg: "NO category found !>?!?!?<!"})
  }
  res.status(200).json({data:category})

})


// @ disc   Delete specific category
// @ route  DELETE /api/v1/categories/:id
// @ access Private
exports.deleteCategory = asyncHundler(async(req,res) => {
  const {id} = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if(!category){
    res.status(404).json({msg: "NO category found !>?!?!?<!"})
  }
  res.status(200).json({msg: "Success ddeleted category"})
})
