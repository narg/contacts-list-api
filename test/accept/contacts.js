/**
 *
 * @since 23/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var logger = require('winston');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.should();
chai.use(chaiHttp);

var server = require('../../app');

var config = require('../../config/config.json');

var url = 'http://127.0.0.1:8001';

describe('Schema', function () {
    var httpServer = null;

    before(function(done) {
        // Start our app on an alternative port for acceptance tests
        httpServer = server.listen(8001, function() {
            logger.info('Listening at http://localhost:8001 for acceptance tests');
            done();
        });
    });

    describe('Contacts Local User', function () {
        var token = null;
        var targetContactId = null;

        before(function (done) {
            chai.request(url)
                .post('/auth')
                .send({username: 'tinywolf709', password: 'rockon'})
                .end(function (error, response) {
                    if (error) {
                        return done(error);
                    }

                    if (!response.headers['authorization']) {
                        return done('Could not login user!')
                    }

                    token = response.headers['authorization'];
                    done();
                });
        });

        describe('Generate', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .get('/contacts/generate')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('should include status in response body', function () {
                expect(response.body).to.include.keys('status');
            });
        });

        describe('Create', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .post('/contacts')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .send({
                        title: "mr",
                        first: "necip",
                        last: "arg",
                        gender: "male",
                        street: "hancıoğlu",
                        city: "istanbul",
                        state: "maltepe",
                        zip: "34854",
                        phone: "00902125739393",
                        cell: "00905412570945",
                        email: "neciparg@gmail.com",
                        picture: "https://randomuser.me/api/portraits/women/64.jpg"
                    })
                    .end(function (err, res) {
                        error = err;
                        response = res;

                        if (res && res.body && res.body._id) {
                            targetContactId = res.body._id;
                        }
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('should include _id in response body', function () {
                expect(response.body).to.include.keys('_id');
            });

            it('should include name in response body', function () {
                expect(response.body).to.include.keys('name');
            });

            it('should include location key in response body', function () {
                expect(response.body).to.include.keys('location');
            });
        });

        describe('Read', function () {
            var error = null;
            var response = null;
            before(function (done) {
                if (!targetContactId) {
                    return done('Contact id is not defined!');
                }

                chai.request(url)
                    .get('/contacts/' + targetContactId)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('should include _id in response body', function () {
                expect(response.body).to.include.keys('_id');
            });

            it('should include name in response body', function () {
                expect(response.body).to.include.keys('name');
            });

            it('should include location key in response body', function () {
                expect(response.body).to.include.keys('location');
            });
        });

        describe('Update', function () {
            var error = null;
            var response = null;
            before(function (done) {
                if (!targetContactId) {
                    return done('Contact id is not defined!');
                }

                chai.request(url)
                    .put('/contacts/' + targetContactId)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .send({
                        title: "mr",
                        first: "necip",
                        last: "arg",
                        gender: "male",
                        street: "hancıoğlu",
                        city: "istanbul",
                        state: "maltepe",
                        zip: "34854",
                        phone: "00902125739393",
                        cell: "00905412570945",
                        email: "neciparg@gmail.com",
                        picture: "https://randomuser.me/api/portraits/women/64.jpg"
                    })
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('should include _id in response body', function () {
                expect(response.body).to.include.keys('_id');
            });

            it('should include name in response body', function () {
                expect(response.body).to.include.keys('name');
            });

            it('should include location key in response body', function () {
                expect(response.body).to.include.keys('location');
            });
        });

        describe('Delete', function () {
            var error = null;
            var response = null;
            before(function (done) {
                if (!targetContactId) {
                    return done('Contact id is not defined!');
                }

                chai.request(url)
                    .delete('/contacts/' + targetContactId)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('body should be null', function () {
                expect(response.body).to.be.empty;
            });
        });

        describe('List', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .get('/contacts')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('should include contacts in response body', function () {
                expect(response.body).to.include.keys('contacts');
            });

            it('should include pagination key in response body', function () {
                expect(response.body).to.include.keys('pagination');
            });
        });

        describe('List with query string', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .get('/contacts?page=1&limit=5')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should be null", function () {
                expect(error).to.be.null;
            });

            it("should response with a 200 status", function () {
                response.should.have.status(200);
            });

            it('should include contacts in response body', function () {
                expect(response.body).to.include.keys('contacts');
            });

            it('should include pagination key in response body', function () {
                expect(response.body).to.include.keys('pagination');
            });
        });

        describe('Read non existed contact', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .get('/contacts/' + mongoose.Types.ObjectId())
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        console.log('body =>', res.body);
                        done();
                    });
            });

            it("error should not be null", function () {
                expect(error).to.not.be.null;
            });

            it("should response with a 404 status", function () {
                response.should.have.status(404);
            });
        });

        describe('Read with id that causes server error', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .get('/contacts/' + moment().unix())
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should not be null", function () {
                expect(error).to.not.be.null;
            });

            it("should response with a 500 status", function () {
                response.should.have.status(500);
            });
        });

        describe('Update non existed contact', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .put('/contacts/' + mongoose.Types.ObjectId())
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        console.log('body =>', res.body);
                        done();
                    });
            });

            it("error should not be null", function () {
                expect(error).to.not.be.null;
            });

            it("should response with a 404 status", function () {
                response.should.have.status(404);
            });
        });

        describe('Update with id that causes server error', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .put('/contacts/' + moment().unix())
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should not be null", function () {
                expect(error).to.not.be.null;
            });

            it("should response with a 500 status", function () {
                response.should.have.status(500);
            });
        });

        describe('Delete non existed contact', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .delete('/contacts/' + mongoose.Types.ObjectId())
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        console.log('body =>', res.body);
                        done();
                    });
            });

            it("error should not be null", function () {
                expect(error).to.not.be.null;
            });

            it("should response with a 404 status", function () {
                response.should.have.status(404);
            });
        });

        describe('Delete with id that causes server error', function () {
            var error = null;
            var response = null;
            before(function (done) {
                chai.request(url)
                    .delete('/contacts/' + moment().unix())
                    .set('Content-Type', 'application/json')
                    .set('Authorization', config.passport.strategies.jwt.authScheme + ' ' + token)
                    .end(function (err, res) {
                        error = err;
                        response = res;
                        done();
                    });
            });

            it("error should not be null", function () {
                expect(error).to.not.be.null;
            });

            it("should response with a 500 status", function () {
                response.should.have.status(500);
            });
        });
    });

    after(function() {
        httpServer.close();
    });
});
