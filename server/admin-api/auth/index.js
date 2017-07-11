	var express = require('express');
	var router = express.Router();
	var app = express();
	var auth = require('../../models/User.js');
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
	var session = {};

	var IsLoogedIn = function authenticateUser(req, res) {
	  session = req.session;
	  if (session.email) {
	    res.status(200).send({ message: 'You have already logged in' });
	  } else {

	    res.status(401).send({ message: 'User is not Logged in' });
	  }
	}

	var Login = function login(req, res) {

	  let Email = req.body.Email;
	  let Password = req.body.Password;
	  auth.findOne({ email: Email, password: Password })
	    .then(function(userData) {
	      if (userData) {
	        session = req.session;
	        session.email = userData.email;
	        session.mobileNo = userData.mobile1;
	        session.name = userData.ownerName;

	        console.log("session", session);
	        return res.status(200).send({ message: "Login successful", data: userData })
	      } else {
	        return res.status(404).send({ message: "Incorrect Email or Password" })
	      }
	    }).catch(function(error) {
	      console.error(error);
	      return res.status(500).send({ message: "Internal server error" })
	    });
	}

	var Logout = function logout(req, res) {

	  req.session.destroy(function(err) {
	    if (err) {
	      console.log(err);
	    } else {
	      return res.status(200).send({ message: "Logged out" })
	    }
	  })
	}

	module.exports = {
	  IsLoogedIn: IsLoogedIn,
	  Login: Login,
	  Logout: Logout
	}
