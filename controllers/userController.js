const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Account creation
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_form', {
    title: 'Sign Up',
  });
});

// Sign up POST form
exports.sign_up_post = [
  // Sanitize/validate inputs
  body('username', 'Please enter a valid username')
    .trim()
    .isLength({ max: 64 })
    .escape(),
  body('passwordConfirmation', 'Passwords do not match')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .trim()
    .escape(),
  body('password', 'Enter a password of at least 8 characters')
    .isLength({ min: 8 })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) { // No validation errors

      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);

        // Create new user
        } else {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
          });

          try {
            await user.save();
            res.redirect('/user/log-in');
          } catch (err) {
            return next(err);
          }
        }
      });
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

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
});

exports.log_out_get = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');
    }
  });
}