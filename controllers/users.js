
// TODO: This is a test controller so any authorization method does not implemented
var User = require('../models/user');
var express = require('express');
var router = express.Router();

// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, '_id name email username phone cell gender location picture', function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, '_id name email username phone cell gender location picture', function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

module.exports = router;
