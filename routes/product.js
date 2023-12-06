const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/productController');

// Product routes
router.get('/product/create', product_controller.product_create_get);
router.post('/product/create', product_controller.product_create_post);
router.get('/product/:id/delete', product_controller.product_delete_get);
router.post('/product/:id/delete', product_controller.product_delete_post);
router.get('/product/:id/update', product_controller.product_update_get);
router.post('/product/:id/update', product_controller.product_update_post);
router.get('/product/:id', product_controller.product_detail);
router.get('/products', product_controller.product_list);

module.exports = router;