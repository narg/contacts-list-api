/**
 *
 * @since 20/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var express = require('express');
var router = express.Router();
var authenticator = require('../modules/authenticator');

/**
 *
 */
router.post('/', authenticator.authenticate('local', { session: false }), function(req, res) {
  res.json(req.user);
});

/**
 *
 */
router.post('/social', authenticator.authenticate('local-social', { session: false }), function(req, res) {
  res.json(req.user);
});

module.exports = router;
