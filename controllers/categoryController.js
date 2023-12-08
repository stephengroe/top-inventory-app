const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  const all_categories = await Category.find().exec();

  res.render('category_list', {
    title: 'All Categories',
    all_categories: all_categories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, categoryProducts] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }).exec(),
  ]);
  res.render('category_detail', {
    title: category.name,
    category: category,
    category_products: categoryProducts,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', {
    title: 'Create Category',
    category: null, // Prevent reference errors
  });
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Category create POST");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Category delete GET");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Category delete POST");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.render('category_form', {
    title: 'Update Category',
    category: category,
  });
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Category update POST");
});