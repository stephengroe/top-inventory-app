const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

exports.home_page = asyncHandler(async (req, res, next) => {
  const [featuredProducts, featuredBrands, allCategories] = await Promise.all([
    Product.find().limit(5).exec(),
    Brand.find().limit(3).exec(),
    Category.find().exec(),
  ]);

  res.render('home_page', {
    title: 'Joy of Tea',
    featured_products: featuredProducts,
    featured_brands: featuredBrands,
    all_categories: allCategories,
  });
});
