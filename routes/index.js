const express = require('express');
const router = express.Router();
const main_controller = require('../controllers/mainController');

// Home page
router.get('/', main_controller.home_page);

module.exports = router;