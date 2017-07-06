	var app = require('express');
	var user = require('./user.controller.js');

	var express_router = app.Router();



	express_router.get('/admin-api/user', user.getAllUser);

	express_router.get('/admin-api/user/:id', user.getUserbyId);

	express_router.post('/admin-api/user', user.insertNewUser);

	express_router.put('/admin-api/user/:id', user.updateUser);

	express_router.delete('/admin-api/user/:id', user.deleteUser);
	module.exports = express_router;
