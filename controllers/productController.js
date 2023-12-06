const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

exports.product_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product list");
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product detail");
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product create GET");
});

exports.product_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product create POST");
});

exports.product_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product delete GET");
});

exports.product_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product delete POST");
});

exports.product_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product update GET");
});

exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Product update POST");
});