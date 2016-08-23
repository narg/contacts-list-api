/**
 *
 * @since 20/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var _ = require('lodash');
var moment = require('moment');
var express = require('express');
var router = express.Router();
var authenticator = require('../modules/authenticator');
var Contact = require('../models/contact');


/**
 * This is a helper controller to generate contacts if user does not have any contact. Do not use in a production mode
 */
router.get('/generate', authenticator.authenticate('jwt', {session: false}), function(req, res) {
  Contact.count({'owner.id': req.user._id, 'owner.type': req.user.type}, function(error, count) {
    if (error) {
      return res.status(500).json({
        error: "Error counting contacts: " + error
      });
    }

    if (count !== 0) {
      return res.status(500).json({
        error: "User has contacts already!"
      });
    }

    var shell = require('shelljs');
    shell.exec('node seed/seedContacts.js --id=' + req.user._id + ' --type=' + req.user.type, function(error) {
      if (error) {
        return res.status(500).json({
          error: "Error generating contacts: " + error
        });
      }

      res.json({
        status: 'Contacts generated for user successfully!'
      });
    });
  });
});

// List contacts
router.get('/', authenticator.authenticate('jwt', {session: false}), function(req, res) {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var limit = req.query.limit ? parseInt(req.query.limit) : 12;

  Contact.find({'owner.id': req.user._id, 'owner.type': req.user.type})
        .skip(parseInt((page - 1) * limit))
        .limit(limit)
        .exec(function(err, contacts) {
          if (err) {
            return res.status(500).json({
              error: "Error listing contacts: " + err
            });
          }

          Contact.count({'owner.id': req.user._id, 'owner.type': req.user.type}, function(error, count) {
            if (err) {
              return res.status(500).json({
                error: "Error counting contacts: " + err
              });
            }

            res.json({
              contacts: contacts,
              pagination: {
                page: page,
                pageCount: _.ceil(count / limit),
                totalCount: count
              }
            });
          });
        });
});

// POST /contacts
// Create a new contact
router.post('/', authenticator.authenticate('jwt', {session: false}), function(req, res) {
  var contact = new Contact({
    owner: {
      id: req.user._id,
      type: req.user.type
    },
    name: {
      title: req.body.title,
      first: req.body.first,
      last: req.body.last
    },
    ownerId: req.user._id,
    gender: req.body.gender,
    location: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    },
    phone: req.body.phone,
    cell: req.body.cell,
    email: req.body.email,
    picture: req.body.picture,
    created: moment().unix()
  });

  contact.save(function(error) {
    if (error) {
      return res.status(500).json({
        error: "Error creating contact: " + error
      });
    }

    res.json(contact);
  });
});

// PUT /contacts/:id
// Update a contact by id
router.put('/:id', authenticator.authenticate('jwt', {session: false}), function(req, res) {
  Contact.findOne({
    _id: req.params.id,
    'owner.id': req.user._id,
    'owner.type': req.user.type
  }, function(err, contact) {
    if (err) {
      return res.status(500).json({
        error: "Error reading contact: " + err
      });
    }

    if (!contact) {
      return res.status(404).end();
    }

        // TODO: Use different method and decide to update null properties or null
    if (req.body.title && req.body.title !== '') {
      contact.set('name.title', req.body.title);
    }

    if (req.body.first && req.body.first !== '') {
      contact.set('name.first', req.body.first);
    }

    if (req.body.last && req.body.last !== '') {
      contact.set('name.last', req.body.last);
    }

    if (req.body.gender && req.body.gender !== '') {
      contact.set('gender', req.body.gender);
    }

    if (req.body.street && req.body.street !== '') {
      contact.set('location.street', req.body.street);
    }

    if (req.body.city && req.body.city !== '') {
      contact.set('location.city', req.body.city);
    }

    if (req.body.state && req.body.state !== '') {
      contact.set('location.state', req.body.state);
    }

    if (req.body.zip && req.body.zip !== '') {
      contact.set('location.zip', req.body.zip);
    }

    if (req.body.phone && req.body.phone !== '') {
      contact.set('phone', req.body.phone);
    }

    if (req.body.cell && req.body.cell !== '') {
      contact.set('cell', req.body.cell);
    }

    if (req.body.email && req.body.email !== '') {
      contact.set('email', req.body.email);
    }

    if (req.body.picture && req.body.picture !== '') {
      contact.set('picture', req.body.picture);
    }

    contact.set('updated', moment().unix());

    contact.save(function(error) {
      if (error) {
        return res.status(500).json({
          error: "Error updating contact: " + error
        });
      }

      res.json(contact);
    });
  });
});

// DELETE /contacts/:id
// Delete a contact by id
router.delete('/:id', authenticator.authenticate('jwt', {session: false}), function(req, res) {
  Contact.findOne({
    _id: req.params.id,
    'owner.id': req.user._id,
    'owner.type': req.user.type
  }, function(err, contact) {
    if (err) {
      return res.status(500).json({
        error: "Error removing: " + err
      });
    }

    if (!contact) {
      return res.status(404).end();
    }

    Contact.remove({_id: req.params.id}, function(error) {
      if (error) {
        return res.status(500).json({
          error: 'Error: Could not delete contact'
        });
      }

      res.json();
    });
  });
});

// GET /contacts/:id
// Get a contact by id
router.get('/:id', authenticator.authenticate('jwt', {session: false}), function(req, res) {
  Contact.findOne({
    _id: req.params.id,
    'owner.id': req.user._id,
    'owner.type': req.user.type
  }, function(err, contact) {
    if (err) {
      return res.status(500).json({
        error: "Error reading contact: " + err
      });
    }

    if (!contact) {
      return res.status(404).end();
    }

    res.json(contact);
  });
});

module.exports = router;
