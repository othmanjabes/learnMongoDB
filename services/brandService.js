const slugify = require('slugify')
const asyncHundler = require('express-async-handler');
const brandModel = require('../models/brandModel')

// @disc Get list of brand
// @route Get /brand
// @access public
exports.getBrand = asyncHundler(async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const brand = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({result: brand.length,page, data:brand})
});

// @ disc   Get spicefic brand
// @ route  GET /brand/:id
// @ access public
exports.getBrands = asyncHundler(async(req, res,next) => {
  const {id} = req.params;
  const brand = await brandModel.findById(id);
  if(brand === null){
    res.status(404).json({msg: "NO brand found"})
  }
  res.status(200).json({data:brand})
});

// @disc create brand
// @route POST /api/v1/brand
// @access Private 
exports.createBrand = asyncHundler(async (req, res) => {
  const {name} = req.body;
  const brand = await brandModel.create({name,slug:slugify(name)})
  res.status(201).json({data:brand})
});

// @ disc   update specific brand
// @ route  PUT brand/:id
// @ access Private
exports.updateBrand = asyncHundler(async(req,res)=>{
  const {id} = req.params;
  const {name} = req.body;
  const brand = await brandModel.findByIdAndUpdate({_id:id},{name:name ,slug:slugify(name)},{new:true});
  if(!brand){
    res.status(404).json({msg: "NO brand found!"})
  }
  res.status(200).json({data:brand})

})


// @ disc   Delete specific brand
// @ route  DELETE /brand/:id
// @ access Private
exports.deleteBrand = asyncHundler(async(req,res) => {
  const {id} = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if(!brand){
    res.status(404).json({msg: "NO brand found!"})
  }
  res.status(200).json({msg: "Success ddeleted brand"})
})
