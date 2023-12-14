const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  });
});

exports.category_create_post = [
  body('name', 'Please include a category name!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Please include a category description!')
    .trim()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (errors.isEmpty) {
      await category.save();
      res.redirect(category.url);
    } else {
      res.render('category_form', {
        title: 'Create Category',
        category: category,
        errors: errors.array(),
      });
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, categoryProducts] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id}).exec(),
  ]);

  if (category === null) {
    // Invalid ID
    res.redirect('/category/list');
  }

  res.render('category_delete', {
    title: 'Delete Category',
    category: category,
    category_products: categoryProducts,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, categoryProducts] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    // Invalid ID
    res.redirect('/category/list');
  }

  if (categoryProducts.length > 0) {
    res.render('category_delete', {
      title: 'Delete Category',
      category: category,
      category_products: categoryProducts,
    });
  } else {
    await Category.findByIdAndDelete(req.body.categoryid).exec();
    res.redirect('/category/list');
  }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.render('category_form', {
    title: 'Update Category',
    category: category,
  });
});

exports.category_update_post = [
  body('name', 'Please include a category name!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Please include a category description!')
    .trim()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    
    if (errors.isEmpty) {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category);
      res.redirect(updatedCategory.url);
    } else {
      res.render('category_form', {
        title: 'Update Category',
        category: category,
        errors: errors.array(),
      });
    }
  }),
];
