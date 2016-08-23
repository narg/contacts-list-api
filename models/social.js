/**
 *
 * @since 21/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Social = mongoose.model('Social', {
    name: Schema.Types.Mixed,
    gender: String,
    email: String,
    username: String,
    location: Schema.Types.Mixed,
    picture: Schema.Types.Mixed,
    platformId: String,
    provider: String,
    accessToken: String,
    refreshToken: String,
    type: String,
    registered: Number,
    updated: Number
});

module.exports = Social;
