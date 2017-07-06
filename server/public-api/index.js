	var app = require('express');
	var client = require('./client/index.js');

	var router = app.Router();



	router.get('/api/client', client.getAllClient);

	// express_router.get('/api/user/:id', client.getUserbyId);

	router.post('/api/client', client.insertNewClient);

	// express_router.put('/api/user/:id', client.updateUser);

	// express_router.delete('/api/user/:id', client.deleteUser);
	module.exports = router;
