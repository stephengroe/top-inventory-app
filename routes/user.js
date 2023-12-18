const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// Sign up
router.get('/sign-up', user_controller.sign_up_get);
router.post('/sign-up', user_controller.sign_up_post);

// Log in
router.get('/log-in', user_controller.log_in_get);
router.post('/log-in', user_controller.log_in_post);

// Log out
router.get('/log-out', user_controller.log_out_get);


module.exports = router;