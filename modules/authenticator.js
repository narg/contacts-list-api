/**
 *
 * @since 20/08/16
 * @author Necip Arg <neciparg@gmail.com>
 */

var async = require('async');
var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

/*var GithubApi = require('github');
var FacebookApi = require('fb');
var InstagramApi = require('instagram-node');
var FoursquareApi = require('node-foursquare');*/

var User = require('../models/user');
var Social = require('../models/social');
var config = require('../config/config.json');

/**
 * Local Strategy
 */
passport.use(new LocalStrategy(config.passport.strategies.local, function (req, username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            // Check password is valid or not
            bcrypt.compare(password, user.password, function (error, res) {
                if (error) {
                    return done(error);
                }

                if (!res) {
                    return done(null, false, {message: 'Incorrect password.'})
                }

                var payload = {
                    id: user._id,
                    type: 'local',
                    exp: moment().add(7, 'day').unix()
                };

                var authToken = jwt.sign(payload, config.passport.strategies.jwt.secretOrKey);
                req.res.header('Authorization', authToken);

                user.type = 'local';
                user.password = '*************';
                return done(null, user);
            });
        });
    }
));

/**
 * Local Social Strategy
 * TODO: Convert id to access token and check if token is valid on related platform
 */
passport.use('local-social', new LocalStrategy({
        usernameField: 'id',
        passwordField: 'provider',
        passReqToCallback: true
    },
    function (req, id, provider, done) {
        Social.findOne({
            'platformId': id,
            'provider': provider
        }, 'name email username gender location picture platformId provider registered updated', function (error, social) {
            if (error) {
                return done(error);
            }

            if (!social) {
                switch (provider) {
                    case 'github':
                        social = new Social({
                            name: req.body.data.name,
                            location: req.body.data._json.location,
                            email: req.body.data._json.email,
                            username: req.body.data.username,
                            picture: req.body.data._json.avatar_url,
                            provider: req.body.data.provider,
                            platformId: req.body.data.id,
                            accessToken: req.body.accessToken,
                            refreshToken: req.body.refreshToken
                        });
                        break;
                    case 'facebook':
                        social = new Social({
                            name: req.body.data.displayName,
                            provider: req.body.data.provider,
                            platformId: req.body.data.id,
                            accessToken: req.body.accessToken,
                            refreshToken: req.body.refreshToken
                        });
                        break;
                    case 'twitter':
                        social = new Social({
                            name: req.body.data.displayName,
                            username: req.body.data.username,
                            location: req.body.data._json.location,
                            provider: req.body.data.provider,
                            platformId: req.body.data.id,
                            accessToken: req.body.accessToken,
                            refreshToken: req.body.refreshToken
                        });
                        break;
                    case 'linkedin':
                        social = new Social({
                            name: {
                                first: req.body.data.name.givenName,
                                last: req.body.data.name.familyName
                            },
                            provider: req.body.data.provider,
                            platformId: req.body.data.id,
                            accessToken: req.body.accessToken,
                            refreshToken: req.body.refreshToken
                        });
                        break;
                    case 'instagram':
                        social = new Social({
                            name: req.body.data.displayName,
                            username: req.body.data.username,
                            picture: req.body.data._json.data.profile_picture,
                            provider: req.body.data.provider,
                            platformId: req.body.data.id,
                            accessToken: req.body.accessToken,
                            refreshToken: req.body.refreshToken
                        });
                        break;
                    case 'foursquare':
                        social = new Social({
                            name: {
                                first: req.body.data.name.givenName,
                                last: req.body.data.name.familyName
                            },
                            gender: req.body.data.gender,
                            location: req.body.data._json.location,
                            email: req.body.data._json.email,
                            username: req.body.data.username,
                            picture: req.body.data._json.avatar_url,
                            provider: req.body.data.provider,
                            platformId: req.body.data.id,
                            accessToken: req.body.accessToken,
                            refreshToken: req.body.refreshToken
                        });
                        break;
                    default:
                        var err = new Error();
                        err.message = 'Unknown provider: ' + provider;
                        return done(err);
                }

                social.registered = moment().unix();
            }

            async.waterfall([
                function (callback) {
                    social.updated = moment().unix();
                    social.save(function(error) {
                        callback(error, social);
                    });
                },
                function (social, callback) {
                    if (error) {
                        return callback(error);
                    }

                    var payload = {
                        id: social._id,
                        type: 'social',
                        exp: moment().add(7, 'day').unix()
                    };

                    callback(null, jwt.sign(payload, config.passport.strategies.jwt.secretOrKey));
                }
            ], function (error, authToken) {
                if (error) {
                    return done(error);
                }
                req.res.header('Authorization', authToken);
                social.type = 'social';
                done(null, social);
            });
        });
    }
));

/**
 * JWT Strategy
 */
config.passport.strategies.jwt.jwtFromRequest = ExtractJwt.fromAuthHeader();

passport.use(new JwtStrategy(config.passport.strategies.jwt, function (req, jwtPayload, done) {
    switch (jwtPayload.type) {
        case 'local':
            User.findById(jwtPayload.id, function (err, user) {
                if (err) {
                    return done(err, false);
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect token.' });
                }

                user.type = 'local';
                user.password = '*************';
                done(null, user);
            });
            break;
        case 'social':
            Social.findById(jwtPayload.id, function (err, social) {
                if (err) {
                    return done(err, false);
                }

                if (!social) {
                    return done(null, false, { message: 'Incorrect token.' });
                }

                social.type = 'social';
                done(null, social);
            });
            break;
        default:
            var error = new Error();
            error.message = 'Unknown type: ' + jwtPayload.type;
            return done(error);
    }
}));


module.exports = passport;
