var express = require('express');
var router = express.Router();
var SendMail = require("../../helpers/send-mail.js");
var app = express();
var user = require('../../models/User.js');
var request = require('request');


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

var sendSMS = function get(req, res) {
    let email = req.params.email;
    const userId = "2000144979";
    const password = "etXCalqSL";
    user.findOne({ email: email }, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            let mobile = user.mobile1;
            let msg = "Hello " + user.ownerName + ", Welcome to GST Registration111";
            request('http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=' + mobile + '&msg=' + msg + '&msg_type=TEXT&userid=' + userId + '&auth_scheme=plain&password=' + password + '&v=1.1&format=text', function(error, response, body) {
                if (error) {
                    console.log('body:', body);
                    res.send(error);
                } else {
                    console.log('body:', body);
                    res.send(response);
                }
            });
        }
    });
};

module.exports = {
    sendMail: sendMail,
    sendSMS: sendSMS
}
