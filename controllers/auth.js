/**
 *
 * @since 20/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var express = require('express');
var router = express.Router();
var authenticator = require('../modules/authenticator');

// To avoid duplicate blocks on sonar new function defined
var authenticationCallback = function(req, res) {
  res.json(req.user);
};

/**
 * Authentication with username and password
 */
router.post('/', authenticator.authenticate('local', { session: false }), authenticationCallback);

/**
 * Authentication with access token for social platforms
 */
router.post('/social', authenticator.authenticate('local-social', { session: false }), authenticationCallback);

module.exports = router;
