const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// Tell passport we want to use a Local Strategy.
passport.use(new LocalStrategy(
    function (username, password, done) {
        db.User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, user);
        });
    }
));