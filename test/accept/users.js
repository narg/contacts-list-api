var logger = require('winston');
var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var shell = require('shelljs');

var server = require('../../app');
var User = require('../../models/user');

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';


describe('Users', function () {
    var httpServer = null;

    // Before our test suite
    before(function (done) {
        httpServer = server.listen(8001, function () {
            logger.info('Listening at http://localhost:8001 for acceptance tests');
            done();
        });
    });

    describe('Seed users', function () {
        it('should seed users', function (done) {
            shell.exec('node seed/seed.js', done);
        });
    });

    describe('/GET users', function () {
        it('should return a list of users', function (done) {
            chai.request(url)
                .get('/users')
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    res.should.have.status(200);
                    res.body.length.should.be.eql(100);
                    done();
                });
        });
    });

    describe('/GET users/:id', function () {
        it('should return a single user', function (done) {
            // Find a user in the DB
            User.findOne({}, function (err, user) {
                var id = user._id;

                // Read this user by id
                chai.request(url)
                    .get('/users/' + id)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body.name.first).to.be.a('string');
                        done();
                    });
            });
        });
    });

    describe('/GET users/:id', function () {
        it('should return with not found error', function (done) {
            chai.request(url)
                .get('/users/' + mongoose.Types.ObjectId())
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/GET users/:id', function () {
        it('should return with server error', function (done) {
            chai.request(url)
                .get('/users/' + moment().unix())
                .end(function (err, res) {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    after(function () {
        httpServer.close();
    });
});
