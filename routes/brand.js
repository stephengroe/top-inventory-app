const express = require('express');
const router = express.Router();
const brand_controller = require('../controllers/brandController');
const { model } = require('mongoose');

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