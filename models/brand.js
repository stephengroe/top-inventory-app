const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  website: { type: String },
});

// Virtual property for brand URL
BrandSchema.virtual('url').get(function() {
  return `/brand/${this._id}`;
});

// Export
module.exports = mongoose.model('Brand', BrandSchema);