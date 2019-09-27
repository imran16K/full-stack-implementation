// will use common js modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./configs/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

//calling express by a function generates a new application
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

//invoking the function being called in from services
require('./routes/authRoutes')(app);

//route handler
//this handler is exposed to the 'get' method, this watches for incoming requests
// '/' forward slashes watches for requests trying to be accessed
//'req' is an object representing the incoming requests, 'res' is an object representing the outgoing response
// 'res.send' sends json object user is trying to request
//second argument is an arrow function that is called automatically when a request is made by '/'


//heroku will run application and inject env variables,
//env variables are vars that are set in the underlying runtime that node runs on top of
//gives heroku the ability to pass runtime configs or configs are deployment of app
const PORT = process.env.PORT || 5000;
// express instructing node to listen on port 5000
app.listen(PORT);