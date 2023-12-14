const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  });
});

exports.product_create_post = [
  body('name', 'Please include a name!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Please include a description!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Please include a price!')
    .trim()
    .isFloat({ min: 0.01 })
    .escape(),
  body('weight', 'Please include a weight!')
    .trim()
    .isFloat({ min: 0.01 })
    .escape(),
  body('brand.*', 'Please select a valid brand!')
    .escape(),
  body('category.*', 'Please select a valid category!')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      weight: req.body.price,
      number_in_stock: req.body.number_in_stock,
      category: req.body.category,
      brand: req.body.brand,
    });

    if (errors.isEmpty) {
      await product.save();
      res.redirect(product.url);
    } else {

      // Regenerate content for re-building form page
      const [allCategories, allBrands] = await Promise.all([
        Category.find().sort({ name: 1 }).exec(),
        Brand.find().sort({ name: 1 }).exec(),
      ]);
    
      res.render('product_form', {
        title: 'Create Product',
        all_categories: allCategories,
        all_brands: allBrands,
        product: product,
        errors: errors.array(),
      });
    }
  }),
];

exports.product_delete_get = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category brand').exec();

  if (product === null) {
    // no results!
    res.redirect('/product/list');
  } else {
    res.render('product_delete', {
      title: 'Delete Product',
      product: product,
    });
  }
});

exports.product_delete_post = asyncHandler(async (req, res, next) => {
  await Product.findByIdAndDelete(req.body.productid).exec();
  res.redirect('/product/list');
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

exports.product_update_post = [
  body('name', 'Please include a name!')
    .trim()
    .isLength({ min: 1})
    .escape(),
  body('description', 'Please include a description!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Please include a price!')
    .trim()
    .isFloat({ min: 0.01})
    .escape(),
  body('weight', 'Please include a weight!')
    .trim()
    .isFloat({ min: 0.01})
    .escape(),
  body('brand.*', 'Please select a valid brand!')
    .escape(),
  body('category.*', 'Please select a valid category!')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      weight: req.body.price,
      number_in_stock: req.body.number_in_stock,
      category: req.body.category,
      brand: req.body.brand,
      _id: req.params.id,
    });

    if (errors.isEmpty) {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
      res.redirect(updatedProduct.url);
    } else {

      // Regenerate content for re-building form page
      const [allCategories, allBrands] = await Promise.all([
        Category.find().sort({ name: 1 }).exec(),
        Brand.find().sort({ name: 1 }).exec(),
      ]);
    
      res.render('product_form', {
        title: 'Update Product',
        all_categories: allCategories,
        all_brands: allBrands,
        product: product,
        errors: errors.array(),
      });
    }
  }),
];