/**
 *
 * @since 23/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var logger = require('winston');
var server = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

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

    describe('Contacts Social User', function () {
        var token = null;
        var targetContactId = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "facebook",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: "10154182615377839",
                        provider: "facebook",
                        displayName: "John Forbes Nash"
                    }
                })
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
    });

    after(function() {
        httpServer.close();
    });
});
