// will use common js modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./configs/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

//calling express by a function generates a new application
const app = express();

//middleware are small function that are used to modify incoming request from
//our app before being sent off to route handlers

app.use(bodyParser.json());
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
require('./routes/BillingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //express will serve up production assets like main.js file
    app.use(express.static('client/build'));

    //express will serve up the index.js file if the route is not recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
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