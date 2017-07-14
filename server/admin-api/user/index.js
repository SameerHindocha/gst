let Utils = require('../../libs/utils.js')
module.exports = class UserController {
  constructor(app) {
    // app.get('/admin-api/user', this.getAllUser);
    app.get('/admin-api/user/:id', this.getUserbyId);
    app.get('/admin-api/gst-status/:gstNo', this.getGSTStatus);
    app.post('/admin-api/user', this.insertNewUser);
    app.put('/edituser', this.updateUser);
    // app.delete('/admin-api/user/:id', this.deleteUser);
  }

  // getAllUser(req, res) {
  //   db.User.find({}).then((response) => {
  //     res.send(response);
  //   }).catch((error) => {
  //     res.json(error);
  //   })
  // }

  insertNewUser(req, res) {
    let postbody = req.body;
    let users = new db.User();
    users.companyName = postbody.companyName;
    users.address = postbody.address;
    users.state = postbody.state;
    users.city = postbody.city;
    users.pincode = postbody.pincode;
    users.email = postbody.email;
    users.password = Utils.md5(postbody.password);
    users.ownerName = postbody.ownerName;
    users.mobile1 = postbody.mobile1;
    users.mobile2 = postbody.mobile2;
    users.landline = postbody.landline;
    users.panNo = postbody.panNo;
    users.GSTNo = postbody.GSTNo;
    db.User.findOne({ email: postbody.email }).then((response) => {
      if (response != null) {
        return res.status(409).send({ message: "Email is already registered" });
      } else {
        users.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: 'User Added Successfully' });
          }
        });
      }
    }).catch((error) => {
      res.json(error);
    });
  };

  getUserbyId(req, res) {
    db.User.findById({ _id: req.params.id }, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  };

  updateUser(req, res) {
    console.log(req.session);
    let updatebody = req.body;
    db.User.findOne({ "email": (req.session.userProfile.email) })
      .then((user) => {
        if (user != null) {
          user.companyName = updatebody.companyName;
          user.address = updatebody.address;
          user.state = updatebody.state;
          user.city = updatebody.city;
          user.pincode = updatebody.pincode;
          user.email = updatebody.email;
          user.ownerName = updatebody.ownerName;
          user.mobile1 = updatebody.mobile1;
          user.mobile2 = updatebody.mobile2;
          user.landline = updatebody.landline;
          user.panNo = updatebody.panNo;
          user.GSTNo = updatebody.GSTNo;
        }
        user.save()
          .then((user) => {
            req.session.userData = user;
            res.send({ message: 'User Updated Successfully' });
          }).catch((err) => {
            res.send(err);
          });
      }).catch((err) => {
        res.send({ message: 'Object Not Found' });
      });

    // let userId = req.params.id;
    // let updatebody = req.body;
    // db.User.findById(userId, function(err, data) {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     data.companyName = updatebody.companyName;
    //     data.address = updatebody.address;
    //     data.state = updatebody.state;
    //     data.city = updatebody.city;
    //     data.pincode = updatebody.pincode;
    //     data.email = updatebody.email;
    //     data.password = updatebody.password;
    //     data.ownerName = updatebody.ownerName;
    //     data.mobile1 = updatebody.mobile1;
    //     data.mobile2 = updatebody.mobile2;
    //     data.landline = updatebody.landline;
    //     data.panNo = updatebody.panNo;
    //     data.GSTNo = updatebody.GSTNo;
    //     data.save(function(err) {
    //       if (err) {
    //         res.send(err);

    //       } else {
    //         res.json({ message: 'User updated!' });
    //       }
    //     });
    //   }
    // });
  };

  getGSTStatus(req, res) {
    db.User.findOne({ GSTNo: req.params.gstNo }, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        if (data) {
          return res.status(409).send({ message: "GST is already registered" });
        } else {
          return res.send({ message: 'No match found' });
        }
      }
    });
  };




  // deleteUser(req, res) {
  //   db.User.remove({
  //     _id: req.params.id
  //   }, function(err, data) {

  //     if (data.result.n === 0) {
  //       res.send({ message: 'not Found' });
  //     } else if (err) {
  //       res.send(err);
  //     } else {
  //       res.json({ message: 'Successfully deleted' });
  //     }
  //   });
  // };
}
