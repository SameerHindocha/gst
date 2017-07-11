	module.exports = class UserController {
	  constructor(app) {
	    app.get('/admin-api/user', this.getAllUser);
	    app.get('/admin-api/user/:id', this.getUserbyId);
	    app.post('/admin-api/user', this.insertNewUser);
	    app.put('/admin-api/user/:id', this.updateUser);
	    app.delete('/admin-api/user/:id', this.deleteUser);
	  }

	  getAllUser(req, res) {
	    db.User.find({}).then((response) => {
	      res.send(response);
	    }).catch((error) => {
	      res.json(error);
	    })
	  }

	  insertNewUser(req, res) {
	    let postbody = req.body,
	      users = new db.User();
	    users.companyName = postbody.companyName;
	    users.address = postbody.address;
	    users.state = postbody.state;
	    users.city = postbody.city;
	    users.pincode = postbody.pincode;
	    users.email = postbody.email;
	    users.password = postbody.password;
	    users.ownerName = postbody.ownerName;
	    users.mobile1 = postbody.mobile1;
	    users.mobile2 = postbody.mobile2;
	    users.landline = postbody.landline;
	    users.panNo = postbody.panNo;
	    users.tinNo = postbody.tinNo;
	    users.GSTNo = postbody.GSTNo;
	    users.save(function (err) {
	      if (err) {
	        res.send(err);
	      } else {
	        res.json({ message: 'User created!' });
	      }
	    });
	  };

	  getUserbyId(req, res) {
	    db.User.findById({ _id: req.params.id }, function (err, data) {
	      if (err) {
	        res.send(err);
	      } else {
	        res.json(data);
	      }
	    });
	  };

	  updateUser(req, res) {

	    let userId = req.params.id;
	    let updatebody = req.body;
	    db.User.findById(userId, function (err, data) {
	      if (err) {
	        res.send(err);
	      } else {
	        data.companyName = updatebody.companyName;
	        data.address = updatebody.address;
	        data.state = updatebody.state;
	        data.city = updatebody.city;
	        data.pincode = updatebody.pincode;
	        data.email = updatebody.email;
	        data.password = updatebody.password;
	        data.ownerName = updatebody.ownerName;
	        data.mobile1 = updatebody.mobile1;
	        data.mobile2 = updatebody.mobile2;
	        data.landline = updatebody.landline;
	        data.panNo = updatebody.panNo;
	        data.tinNo = updatebody.tinNo;
	        data.GSTNo = updatebody.GSTNo;
	        data.save(function (err) {
	          if (err) {
	            res.send(err);

	          } else {
	            res.json({ message: 'User updated!' });
	          }
	        });
	      }
	    });
	  };

	  deleteUser(req, res) {
	    db.User.remove({
	      _id: req.params.id
	    }, function (err, data) {

	      if (data.result.n === 0) {
	        res.send({ message: 'not Found' });
	      } else if (err) {
	        res.send(err);
	      } else {
	        res.json({ message: 'Successfully deleted' });
	      }
	    });
	  };
	}
