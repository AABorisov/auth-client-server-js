import passport from 'passport';
import User from '../models/user';
import config from '../secret';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import LocalStrategy from 'passport-local';

// Create local strategy
const localOptions = {
    usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify this email and password, call done with the user
    // if it is the correct username and password
    // otherwise, call done with false
    User.findOne({ email: email })
        .then(user => {
            if (!user) throw new Error("Incorrect username.");
            return user;
        })
        .then(user =>
            user.validPasswordPromise(password)
                .then(isMatch => {
                    if (!isMatch) throw new Error("Incorrect password.");
                    return user;
                })
        )
        .then(user => done(null, user))
        .catch(err => {
            if (err.message === "Incorrect username." ||
                err.message === "Incorrect password.") {
                done(null, false, err);
            } else {
                done(err)
            }
        });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call 'done' without a user object
    User.findById(payload.sub)
        .then((user) => {
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        })
        .catch((err) => done(err, false))
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
export default passport;