const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
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
  const [allCategories, allBrands] = await Promise.all([
    Category.find().sort({ name: 1 }).exec(),
    Brand.find().sort({ name: 1 }).exec(),
  ]);

  res.render('product_form', {
    title: 'Create Product',
    all_categories: allCategories,
    all_brands: allBrands,
    product: null, // Need to pass into view to prevent reference errors
  });
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
  const [product, allCategories, allBrands] = await Promise.all([
    Product.findById(req.params.id).populate('brand category').exec(),
    Category.find().sort({ name: 1 }).exec(),
    Brand.find().sort({ name: 1 }).exec(),
  ]);

  res.render('product_form', {
    title: 'Update Product',
    product: product,
    all_categories: allCategories,
    all_brands: allBrands,
  });
});

exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product update POST");
});