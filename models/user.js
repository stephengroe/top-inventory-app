const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String },
  admin: { type: Boolean, required: true, default: false },
});

// Virtual property for user URL
UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`;
});

// Virtual property for user name
UserSchema.virtual('name').get(function() {
  if (this.username !== null) {
    return this.username;
  } else {
    return this.email;
  }
});

// Export
module.exports = mongoose.model('User', UserSchema);