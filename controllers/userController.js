const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Account creation
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_form', {
    title: 'Sign Up',
  });
});

exports.sign_up_post = [
  body('email', 'Please enter a valid email')
    .trim()
    .isEmail()
    .escape(),
  body('username', 'Please enter a valid username')
    .trim()
    .isLength({ max: 64 })
    .escape(),
  body('password', 'Enter a password of at least 8 characters')
    .isLength({ min: 8 })
    .trim()
    .escape(),
  body('passwordConfirmation', 'Passwords do not match')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    
    if (errors.isEmpty()) {
      res.send(`Information entered successfully!
      
      ${user}`);
    } else {
      res.render('sign_up_form', {
        title: 'Sign Up',
        user: req.body,
        errors: errors.array(),
      });
    }
  }),
];
 
// User login
exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log_in_form', {
    title: 'Log In',
  });
});

exports.log_in_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login POST');
});