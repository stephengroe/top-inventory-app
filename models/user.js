const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
});

// Virtual property for user URL
UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`;
});

// Export
module.exports = mongoose.model('User', UserSchema);