const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../configs/keys');

const User = mongoose.model('users');

//serializeUser function determines which data of the user object should
//be stored in session. The result of the serializeUser method is attached to the session
// as "req.session.passport.user = {}"
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//the first argument of deserializeUser function corresponds to
//the key of the user object that was given to the "done" function
//so the your whole object is retrieved with the help of that key.
//that key here is the user id, so in the deserializeUser function that key
//is matched in the memory array !database!
passport.deserializeUser((id, done) => {
   User.findById(id)
       .then(user => {
           done(null, user);
       });
});

//"passport.use" is a function call that registers authentication with a new strategy
//"new GoogleStrategy" creates a new instance of the google passport strategy
//authenticates user with google inside of function which contains a constructor for configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            //relative path allows greater flexibility
            callbackURL: '/auth/google/callback',
            //if google request runs through any proxy, trust
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if(existingUser) {
                        //record is already contained with given profile Id
                        done(null, existingUser);
                    }
                    else {
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => done(null, user));
                    }
                });
        }
    )
);