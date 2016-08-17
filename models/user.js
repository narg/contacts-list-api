var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
  gender: String,
  name: Schema.Types.Mixed,
  location: Schema.Types.Mixed,
  email: String,
  username: String,
  password: String,
  salt: String,
  md5: String,
  sha1: String,
  sha256: String,
  registered: Number,
  dob: Number,
  phone: String,
  cell: String,
  PPS: String,
  picture: Schema.Types.Mixed
});

module.exports = User;
