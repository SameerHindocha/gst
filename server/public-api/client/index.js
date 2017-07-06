var express = require('express');
var router = express.Router();
var app = express();

var client = require('../../models/client.js');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//   res.json({ message: 'welcome to our api!' });
// });



//POST 
var insertNewClient = function post(req, res) {
    var Client = new client();

    Client.companyName = req.body.companyName;
    Client.address = req.body.address;
    Client.state = req.body.state;
    Client.city = req.body.city;
    Client.pincode = req.body.pincode;
    Client.email = req.body.email;
    Client.ownerName = req.body.ownerName;
    Client.mobile1 = req.body.mobile1;
    Client.mobile2 = req.body.mobile2;
    Client.landline = req.body.landline;
    Client.panNo = req.body.panNo;
    Client.tinNo = req.body.tinNo;
    Client.GSTNo = req.body.GSTNo;
    Client.User = req.body.User;

    Client.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Client created!' });
        }
    });


};

var getAllClient = function get(req, res) {
    client.find(function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }

    });
};


module.exports = {
    insertNewClient: insertNewClient,
    getAllClient: getAllClient

}
