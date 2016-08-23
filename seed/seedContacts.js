/**
 * DB Seeder - seeds MongoDB with documents from `users.json` on disk
 *
 * To seed, run `npm run-script seed`
 */

var async = require('async');
var moment = require('moment');
var mongoose = require('mongoose');
var seeder = require('mongoose-seed');
var logger = require('winston');
var argv = require('minimist')(process.argv.slice(2));

var config = require('../config/config.json');

var seed = function(cb) {
  seeder.connect('mongodb://' + config.databases.mongodb.host +'/contacts', function() {

    // Load the User model
    seeder.loadModels([
      'models/contact.js'
    ]);

    var data = [
      {
        'model': 'Contact',
        'documents': []
      }
    ];

    var users = require('./users.json');
    async.mapLimit(users[0].documents, 10, function(user, callback) {
      data[0].documents.push({
        owner: {
          id: mongoose.Types.ObjectId(argv.id),
          type: argv.type
        },
        name: {
          title: user.name.title,
          first: user.name.first,
          last: user.name.last
        },
        gender: user.gender,
        location: {
          street: user.location.street,
          city: user.location.city,
          state: user.location.state,
          zip: user.location.zip
        },
        email: user.email,
        phone: user.phone,
        cell: user.cell,
        picture: user.picture.large,
        registered: moment().unix()
      });
      callback(null, true);
    }, function() {
      seeder.populateModels(data, function(err) {
        if (err) {
          logger.error('Error seeding', err);
          if (require.main === module) {
            return process.exit(1);
          } else {
            return cb(err);
          }
        }

        logger.log('Seeding done.');
        if (require.main === module) {
          process.exit(0);
        } else {
          return cb();
        }
      });
    });
  });
};

// Run explicitly (e.g. not require'd)
if (require.main === module) {
  seed(function() {
    logger.log('Seeding complete, exiting.');
  });
}

module.exports = seed;