	var app = require('express');
	var user = require('./user/index.js');
	var shareForm = require('./share-form/index.js');
	var auth = require('./auth/index.js')

	var express_router = app.Router();
	express_router.get('/admin-api/user', user.getAllUser);

	express_router.get('/admin-api/user/:id', user.getUserbyId);

	express_router.post('/admin-api/user', user.insertNewUser);

	express_router.put('/admin-api/user/:id', user.updateUser);

	express_router.delete('/admin-api/user/:id', user.deleteUser);

	express_router.get('/admin-api/share-form/:email', shareForm.sendMail);

	express_router.get('/admin-api/send-sms/:email', shareForm.sendSMS);

	express_router.get('/checkLogin', auth.IsLoogedIn);

	express_router.post('/login', auth.Login);

	express_router.get('/logout', auth.Logout);

	module.exports = express_router;
