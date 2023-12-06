const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

exports.brand_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand list");
});

exports.brand_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand detail");
});

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand create GET");
});

exports.brand_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand create POST");
});

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand delete GET");
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand delete POST");
});

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand update GET");
});

exports.brand_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Brand update POST");
});