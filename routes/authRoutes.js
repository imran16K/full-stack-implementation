const passport = require('passport');


module.exports = (app) => {

    //retrieving authentication from google id
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //callback for authentication
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    // route handler for logging out
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // route handler for current user, responds with model representing user being logged in
    app.get('/api/current_user', (req, res) => {
         res.send(req.user);
    });
};