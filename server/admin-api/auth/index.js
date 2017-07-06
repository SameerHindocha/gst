	var app = require('express');
	var auth = require('./auth.controller.js');

	var auth_router = app.Router();



	auth_router.get('/checkLogin', auth.IsLoogedIn);

	auth_router.post('/login', auth.Login);

	auth_router.get('/logout', auth.Logout);

	module.exports = auth_router;
