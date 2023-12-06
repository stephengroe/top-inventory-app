const express = require('express');
const router = express.Router();

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Joy of Tea' });
});

module.exports = router;