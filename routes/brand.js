const express = require('express');
const router = express.Router();
const brand_controller = require('../controllers/brandController');
const { model } = require('mongoose');

// Brand routes
router.get('/create', brand_controller.brand_create_get);
router.post('/create', brand_controller.brand_create_post);
router.get('/list', brand_controller.brand_list);
router.get('/:id/delete', brand_controller.brand_delete_get);
router.post('/:id/delete', brand_controller.brand_delete_post);
router.get('/:id/update', brand_controller.brand_update_get);
router.post('/:id/update', brand_controller.brand_update_post);
router.get('/:id', brand_controller.brand_detail);

module.exports = router;