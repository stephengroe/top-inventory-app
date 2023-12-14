const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true},
  number_in_stock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  weight: { type: Number, required: true, min: 0 },
});

// Virtual property for product URL
ProductSchema.virtual('url').get(function() {
  return `/product/${this._id}`;
});

// Virtual property for availability
ProductSchema.virtual('available').get(function() {
  return this.number_in_stock > 0;
});

// Export
module.exports = mongoose.model('Product', ProductSchema);