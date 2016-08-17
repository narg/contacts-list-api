/**
 * DB Seeder - seeds MongoDB with documents from `users.json` on disk
 *
 * To seed, run `npm run-script seed`
 */

var seeder = require('mongoose-seed');
var logger = require('winston');

var seed = function(cb) {
  seeder.connect('mongodb://localhost/users', function() {

    // Load the User model
    seeder.loadModels([
      'models/user.js'
    ]);

    // Drop existing User documents
    seeder.clearModels(['User'], function() {

      // Populate from `users.json`
      seeder.populateModels(require('./users.json'), function(err) {
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