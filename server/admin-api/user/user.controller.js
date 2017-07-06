var express = require('express');
var router = express.Router();
var app = express();

var user = require('../../models/User.js');


// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'welcome to our api!' });
});



//====POST create a product (accessed at POST http://localhost:8080/products)
var insertNewUser = function post(req, res) {
  var User = new user();

  console.log("req.body", req.body);

  User.companyName = req.body.companyName;
  User.address = req.body.address;
  User.state = req.body.state;
  User.city = req.body.city;
  User.pincode = req.body.pincode;
  User.email = req.body.email;
  User.ownerName = req.body.ownerName;
  User.mobile1 = req.body.mobile1;
  User.mobile2 = req.body.mobile2;
  User.landline = req.body.landline;
  User.panNo = req.body.panNo;
  User.tinNo = req.body.tinNo;
  User.GSTNo = req.body.GSTNo;

  User.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'User created!' });
    }
  });
};

var getAllUser = function get(req, res) {
  user.find(function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }

  });
};

var getUserbyId = function get(req, res) {

  user.findById({ _id: req.params.id }, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }

  });
};

// var User = new user();

var updateUser = function putUser(req, res) {
  var User = new user();
  user.findById(req.params.id, function (err, User) {
    if (err) {
      res.send(err);
    } else {
      User.companyName = req.body.companyName;
      User.address = req.body.address;
      User.state = req.body.state;
      User.city = req.body.city;
      User.pincode = req.body.pincode;
      User.email = req.body.email;
      User.ownerName = req.body.ownerName;
      User.mobile1 = req.body.mobile1;
      User.mobile2 = req.body.mobile2;
      User.landline = req.body.landline;
      User.panNo = req.body.panNo;
      User.tinNo = req.body.tinNo;
      User.GSTNo = req.body.GSTNo;
      User.save(function (err) {
        if (err) {
          res.send(err);
          console.log("update error");
        } else {

          res.json({ message: 'User updated!' });
        }

      });

    }

  });
};


var deleteUser = function deleteuser(req, res) {
  user.remove({
    _id: req.params.id
  }, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Successfully deleted' });
    }
  });
};


module.exports = {
  insertNewUser: insertNewUser,
  getAllUser: getAllUser,
  getUserbyId: getUserbyId,
  updateUser: updateUser,
  deleteUser: deleteUser

}
