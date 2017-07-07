var express = require('express');
var router = express.Router();
var SendMail = require("../../helpers/send-mail.js");
var app = express();
var user = require('../../models/User.js');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });
});

var sendMail = function get(req, res) {
    let email = req.params.email;
    console.log("email in sendemail", email);
    user.findOne({ email: email }, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            let emailObj = {
                subject: `Welcome to GST registration ${user.ownerName} ${user._id}`, // Subject line
                html: `<h4>Hello, ${user.ownerName}</h4> 
                    <h4>Welcome,</h4><br>
                    <a href='http://localhost:8020/#/client/add/${user._id}' class='alert-link'>Click here to fill the GST registration form</a></br></br>
<h4>Warm Regards,<h4>
                    <h4>GST team</h4>`,
            };
            SendMail.MailFunction(emailObj, email);
        }

    });
};
module.exports = {
    sendMail: sendMail,
}
