/**
 *
 * @since 23/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var logger = require('winston');
var server = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';

describe('Authentication', function () {
    var httpServer = null;

    // Before our test suite
    before(function (done) {
        // Start our app on an alternative port for acceptance tests
        httpServer = server.listen(8001, function () {
            logger.info('Listening at http://localhost:8001 for acceptance tests');
            done();
        });
    });

    describe('Login successfully with username and password', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth')
                .send({username: 'tinywolf709', password: 'rockon'})
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include name key in response body', function () {
            expect(response.body).to.include.keys('name');
        });

        it('should include location key in response body', function () {
            expect(response.body).to.include.keys('location');
        });
    });

    describe('Login with github privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "github",
                    accessToken: "blablabla",
                    refreshToken: null,
                    username: "blablabla",
                    data: {
                        id: "10154182615377839",
                        provider: "github",
                        name: "John Forbes Nash",
                        _json: {
                            location: "Istanbul",
                            email: "blabla@example.com",
                            avatar_url: ""
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include name key in response body', function () {
            expect(response.body).to.include.keys('name');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with new github user privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            var id = moment().unix();
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: id,
                    provider: "github",
                    accessToken: "blablabla",
                    refreshToken: null,
                    username: "blablabla",
                    data: {
                        id: id,
                        provider: "github",
                        name: "John Forbes Nash",
                        _json: {
                            location: "Istanbul",
                            email: "blabla@example.com",
                            avatar_url: ""
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include name key in response body', function () {
            expect(response.body).to.include.keys('name');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with facebook privileges', function () {
        var error = null;
        var response = null;

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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include name key in response body', function () {
            expect(response.body).to.include.keys('name');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with new facebook user privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            var id = moment().unix();
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: id,
                    provider: "facebook",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: id,
                        provider: "facebook",
                        displayName: "John Forbes Nash"
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include name key in response body', function () {
            expect(response.body).to.include.keys('name');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with twitter privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "twitter",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: "10154182615377839",
                        provider: "twitter",
                        username: "blablabla",
                        displayName: "John Forbes Nash",
                        _json: {
                            location: "Istanbul"
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with new twitter user privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            var id = moment().unix();
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: id,
                    provider: "twitter",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: id,
                        provider: "twitter",
                        username: "blablabla",
                        displayName: "John Forbes Nash",
                        _json: {
                            location: "Istanbul"
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with linkedin privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "linkedin",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: "10154182615377839",
                        provider: "linkedin",
                        name: {
                            givenName: "John Forbes",
                            familyName: "Nash"
                        },
                        _json: {
                            location: "Istanbul"
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with new linkedin user privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            var id = moment().unix();
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: id,
                    provider: "linkedin",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: id,
                        provider: "linkedin",
                        name: {
                            givenName: "John Forbes",
                            familyName: "Nash"
                        },
                        _json: {
                            location: "Istanbul"
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with instagram privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "instagram",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: "10154182615377839",
                        provider: "instagram",
                        displayName: "John Forbes Nash",
                        username: "johnnash",
                        _json: {
                            data: {
                                profile_picture: "blablabla"
                            }
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with new instagram user privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            var id = moment().unix();
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: id,
                    provider: "instagram",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: id,
                        provider: "instagram",
                        displayName: "John Forbes Nash",
                        username: "johnnash",
                        _json: {
                            data: {
                                profile_picture: "blablabla"
                            }
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with foursquare privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "foursquare",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: "10154182615377839",
                        provider: "foursquare",
                        username: "johnnash",
                        name: {
                            givenName: "John Forbes",
                            familyName: "Nash"
                        },
                        gender: "female",
                        _json: {
                            location: "Istanbul",
                            email: "blabla@example.com",
                            avatar_url: "blablabal"
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login with new foursquare user privileges', function () {
        var error = null;
        var response = null;

        before(function (done) {
            var id = moment().unix();
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: id,
                    provider: "foursquare",
                    accessToken: "blablabla",
                    refreshToken: null,
                    data: {
                        id: id,
                        provider: "foursquare",
                        username: "johnnash",
                        name: {
                            givenName: "John Forbes",
                            familyName: "Nash"
                        },
                        gender: "female",
                        _json: {
                            location: "Istanbul",
                            email: "blabla@example.com",
                            avatar_url: "blablabal"
                        }
                    }
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

        it('should include response with valid credential in header', function () {
            expect(response.headers).to.include.keys('authorization');
        });

        it('should include _id in response body', function () {
            expect(response.body).to.include.keys('_id');
        });

        it('should include provider key in response body', function () {
            expect(response.body).to.include.keys('provider');
        });

        it('should include platformId in response body', function () {
            expect(response.body).to.include.keys('platformId');
        });
    });

    describe('Login failed with incorrect username', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth')
                .send({username: moment().unix().toString(), password: 'rockon'})
                .end(function (err, res) {
                    error = err;
                    response = res;
                    done();
                });
        });

        it("error should not be null", function () {
            expect(error).to.be.not.null;
        });

        it("should response with a 401 status", function () {
            response.should.have.status(401);
        });
    });

    describe('Login failed with incorrect password', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth')
                .send({username: 'tinywolf709', password: moment().unix().toString()})
                .end(function (err, res) {
                    error = err;
                    response = res;
                    done();
                });
        });

        it("error should not be null", function () {
            expect(error).to.be.not.null;
        });

        it("should response with a 401 status", function () {
            response.should.have.status(401);
        });
    });

    describe('Login failed with error', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth')
                .send({username: 'tinywolf709', password: moment().unix()})
                .end(function (err, res) {
                    error = err;
                    response = res;
                    done();
                });
        });

        it("error should not be null", function () {
            expect(error).to.be.not.null;
        });

        it("should response with a 500 status", function () {
            response.should.have.status(500);
        });
    });

    describe('Login with unknown provider', function () {
        var error = null;
        var response = null;

        before(function (done) {
            chai.request(url)
                .post('/auth/social')
                .send({
                    id: "10154182615377839",
                    provider: "unknown",
                    accessToken: "blablabla",
                    refreshToken: null
                })
                .end(function (err, res) {
                    error = err;
                    response = res;
                    done();
                });
        });

        it("error should null", function () {
            expect(error).to.be.not.null;
        });

        it("should response with a 500 status", function () {
            response.should.have.status(500);
        });
    });

    after(function() {
        httpServer.close();
    });
});
