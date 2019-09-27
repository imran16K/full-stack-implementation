const mongoose = require('mongoose');

//mongoose object has a property called 'schema', take property and assign to new
//variable called 'schema', this is es6 destructuring.
const { Schema } = mongoose;

//creating schema, will describe what every individual record will look like
const userSchema = new Schema({
   googleId: String
});

//create model class to tell mongoose that it needs to be aware of new collection created
//note that mongoose will not override existing collections
//it will only create it if it does not already exist
mongoose.model('users', userSchema);