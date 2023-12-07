const Brand = require('../models/brand');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().exec();
  res.render('brand_list', {
    title: 'All Brands',
    all_brands: allBrands,
  });
});

exports.brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, brandProducts] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Product.find({ brand: req.params.id }).exec(),
  ]);
  res.render('brand_detail', {
    title: brand.name,
    brand: brand,
    brand_products: brandProducts,
  });
});

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand create GET");
});

exports.brand_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand create POST");
});

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand delete GET");
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand delete POST");
});

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand update GET");
});

exports.brand_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand update POST");
});