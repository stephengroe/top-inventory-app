const Brand = require('../models/brand');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  res.render('brand_form', {
    title: 'Create Brand',
  });
});

exports.brand_create_post = [
  body('name', 'Please include a brand name!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Please include a valid description!')
    .trim()
    .escape(),
  body('address', 'Please include a valid address!')
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
    });
    
    if (errors.isEmpty()) {
      await brand.save();
      res.redirect(brand.url);
    } else {
      // Regenerate page
      res.render('brand_form', {
        title: 'Create Brand',
        brand: brand,
        errors: errors.array(),
      });
    }
  }),
];

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  const [brand, brandProducts] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Product.find({ brand: req.params.id }).populate('category').sort( {name: 1 }).exec(),
  ]);

  if (brand === null) {
    // Invalid ID
    res.redirect('/brand/list');
  } else {
    res.render('brand_delete', {
      title: 'Delete Brand',
      brand: brand,
      brand_products: brandProducts,
    });
  }
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  const [brand, brandProducts] = await Promise.all([
    Brand.findById(req.body.id).exec(),
    Product.find({ brand: req.body.id }).exec(),
  ]);
  
  if (brand === null) {
    // Invalid ID
    res.redirect('/brand/list');
  }

  if (brandProducts.length > 0) {
    res.render('brand_delete', {
      title: 'Delete Brand',
      brand: brand,
      brand_products: brandProducts,
    });
  } else {
    await Brand.findByIdAndDelete(req.body.brandid).exec();
    res.redirect('/brand/list');
  }
});

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();
  res.render('brand_form', {
    title: 'Update Brand',
    brand: brand,
  });
});

exports.brand_update_post = [
  body('name', 'Please include a brand name!')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Please include a valid description!')
    .trim()
    .escape(),
  body('address', 'Please include a valid address!')
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      _id: req.params.id,
    });

  if (errors.isEmpty()) {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, brand);
    res.redirect(updatedBrand.url);
  } else {
    res.render('brand_form', {
      title: 'Update Brand',
      brand: brand,
      errors: errors.toArray(),
    });
  }
  }),
];