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
        passport.authenticate('google')
    );

    // route handler for logging out
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    // route handler for current user
    app.get('/api/current_user', (req, res) => {
         res.send(req.user);
    });
};