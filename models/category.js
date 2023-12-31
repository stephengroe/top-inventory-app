const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// Virtual property for category url
CategorySchema.virtual('url').get(function() {
  return `/category/${this._id}`;
});

// Export
module.exports = mongoose.model('Category', CategorySchema);