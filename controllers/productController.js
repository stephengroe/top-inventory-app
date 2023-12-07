const Product = require('../models/product');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find().populate('category brand').exec();
  res.render('product_list', {
    title: 'Product List',
    all_products: allProducts,
  });
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category brand').exec();
  res.render('product_detail', {
    title: product.name,
    product: product,
  });
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product create GET");
});

exports.product_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product create POST");
});

exports.product_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product delete GET");
});

exports.product_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product delete POST");
});

exports.product_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product update GET");
});

exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product update POST");
});