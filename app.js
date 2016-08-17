var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var marked = require('marked');
var fs = require('fs');
var logger = require('winston');
var userController = require('./controllers/users');

var app = express();

// Add middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, err) { // eslint-disable-line no-unused-vars
  var md = function(filename) {
    var path = __dirname + "/" + filename;
    var include = fs.readFileSync(path, 'utf8');
    var html = marked(include);

    return html;
  };

  return res.render('index.ejs', {
    "md": md
  });
});

// See the User Controller for `/users` routes
app.use('/users', userController);


// Some switches for acceptance tests
if (require.main === module) {
  // Only connect to MongoDB if app.js is run
  // If require'd (e.g. in tests), let these tests establish a DB connection themselves
  mongoose.connect('mongodb://localhost/users');

  // Only listen when app.js is run - acceptance tests will listen on another port
  app.listen(8000, function() {
    logger.info('Listening at http://localhost:8000 - see here for API docs');
  });
}

module.exports = app;
