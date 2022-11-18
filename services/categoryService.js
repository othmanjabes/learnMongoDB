const slugify = require('slugify')
const asyncHundler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel')

// @disc Get list of category
// @route Get /Category
// @access public
exports.getCategories = asyncHundler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({result: categories.length,page, data:categories})
});

// @ disc   Get spicefic category
// @ route  GET /Category/:id
// @ access public
exports.getCategory = asyncHundler(async(req, res,next) => {
  const {id} = req.params;
  const category = await CategoryModel.findById(id);
  console.log("log>>>: ",category,' >>> id: ',id);
  if(category === null){
    res.status(404).json({msg: "NO category found get category"})
  }
  res.status(200).json({data:category})
});

// @disc create category
// @route POST /categories
// @access Private 
exports.createCategory = asyncHundler(async (req, res) => {
  const {name} = req.body;
  const category = await CategoryModel.create({name,slug:slugify(name)})
  res.status(201).json({data:category})
});

// @ disc   update specific category
// @ route  PUT /categories/:id
// @ access Private
exports.updateCategory = asyncHundler(async(req,res)=>{
  const {id} = req.params;
  const {name} = req.body;
  const category = await CategoryModel.findByIdAndUpdate({_id:id},{name:name ,slug:slugify(name)},{new:true});
  if(!category){
    res.status(404).json({msg: "NO category found !>?!?!?<!"})
  }
  res.status(200).json({data:category})

})


// @ disc   Delete specific category
// @ route  DELETE /categories/:id
// @ access Private
exports.deleteCategory = asyncHundler(async(req,res) => {
  const {id} = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if(!category){
    res.status(404).json({msg: "NO category found !>?!?!?<!"})
  }
  res.status(200).json({msg: "Success ddeleted category"})
})
