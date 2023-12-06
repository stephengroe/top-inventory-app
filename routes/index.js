const express = require('express');
const router = express.Router();

// Import controller modules
const product_controller = require('../controllers/productController');
const brand_controller = require('../controllers/brandController');
const category_controller = require('../controllers/categoryController');

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Joy of Tea' });
});

// Product routes
router.get('/product/create', product_controller.product_create_get);
router.post('/product/create', product_controller.product_create_post);
router.get('/product/:id/delete', product_controller.product_delete_get);
router.post('/product/:id/delete', product_controller.product_delete_post);
router.get('/product/:id/update', product_controller.product_update_get);
router.post('/product/:id/update', product_controller.product_update_post);
router.get('/product/:id', product_controller.product_detail);
router.get('/products', product_controller.product_list);

// Category routes
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);
router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);
router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);
router.get('/category/:id', category_controller.category_detail);

// Brand routes
router.get('/brand/create', brand_controller.brand_create_get);
router.post('/brand/create', brand_controller.brand_create_post);
router.get('/brand/:id/delete', brand_controller.brand_delete_get);
router.post('/brand/:id/delete', brand_controller.brand_delete_post);
router.get('/brand/:id/update', brand_controller.brand_update_get);
router.post('/brand/:id/update', brand_controller.brand_update_post);
router.get('/brand/:id', brand_controller.brand_detail);
router.get('/brands', brand_controller.brand_list);

module.exports = router;
