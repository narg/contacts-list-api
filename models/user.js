/**
 *
 * @since 21/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
  gender: String,
  name: Schema.Types.Mixed,
  location: Schema.Types.Mixed,
  email: String,
  username: String,
  password: String,
  phone: String,
  cell: String,
  picture: Schema.Types.Mixed,
  type: String,
  registered: Number,
  updated: Number
});

module.exports = User;
