
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signin', new LocalStrategy({
    usernameField: 'uid',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, uid, password, done) {
req.check('uid', 'Invalid User ID').notEmpty();
req.check('password', 'Invalid password').notEmpty();
var errors = req.validationErrors();
if (errors) {
    var messages = [];
    errors.forEach(function(error) {
        messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
}
    User.findOne({'uid': uid}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));