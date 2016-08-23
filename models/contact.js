/**
 *
 * @since 21/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = mongoose.model('Contact', {
  owner: Schema.Types.Mixed,
  name: Schema.Types.Mixed,
  gender: String,
  location: Schema.Types.Mixed,
  email: String,
  phone: String,
  cell: String,
  picture: Schema.Types.Mixed,
  created: Number,
  updated: Number
});

module.exports = Contact;
