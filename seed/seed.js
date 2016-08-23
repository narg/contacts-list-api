/**
 * DB Seeder - seeds MongoDB with documents from `users.json` on disk
 *
 * To seed, run `npm run-script seed`
 */

var async = require('async');
var bcrypt = require('bcrypt');
var moment = require('moment');
var seeder = require('mongoose-seed');
var logger = require('winston');
var config = require('../config/config.json');

var seed = function(cb) {
  seeder.connect('mongodb://' + config.databases.mongodb.host +'/contacts', function() {

    // Load the User model
    seeder.loadModels([
      'models/user.js'
    ]);

    // Drop existing User documents
    seeder.clearModels(['User'], function() {

      var users = require('./users.json');
      async.mapLimit(users[0].documents, 10, function(user, callback) {
        delete user.salt;
        delete user.md5;
        delete user.sha1;
        delete user.sha256;
        delete user.registered;
        delete user.dob;
        delete user.PPS;

        // Use bcrypt module to save password
        user.password = bcrypt.hashSync(user.password, 10);
        user.registered = moment().unix();
        callback(null, user);
      }, function(error, results) {
        users[0].documents = results;
        // Populate from `users.json`
        seeder.populateModels(users, function(err) {
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
  });
};

// Run explicitly (e.g. not require'd)
if (require.main === module) {
  seed(function() {
    logger.log('Seeding complete, exiting.');
  });
}

module.exports = seed;