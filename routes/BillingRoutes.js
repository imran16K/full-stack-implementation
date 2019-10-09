const keys = require('../configs/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

//this will be the stripe api handler
//
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: 'Example charge',
                source: req.body.id
            });

            req.user.credits +=5;
            const user = await req.user.save();
            res.send(user);
        });
};