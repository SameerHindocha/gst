let Utils = require('../../libs/utils.js')
module.exports = class ClientController {
  constructor(app) {
    app.get('/api/client', this.getAllClient);
    app.get('/api/client-by-user/:email', this.getClientsByUser);
    // app.get('/api/gst-status/:gstNo', this.getGSTStatus);
    app.post('/api/client', this.insertNewClient);
  }

  insertNewClient(req, res) {
    let Client = new db.Client();
    let userAsClient = new db.Client();
    let User = new db.User();
    let finalId;
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
    User.GSTNo = req.body.GSTNo;
    if (req.body.password) {
      User.password = Utils.md5(req.body.password)
    }
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
    Client.GSTNo = req.body.GSTNo;
    Client.userId = req.body.userId;
    if (req.body.password) {
      Client.password = Utils.md5(req.body.password)
    }

    if (req.body.password) {
      db.User.findOne({ email: req.body.email }, function(err, repeatedUser) {
        if (repeatedUser != null) {
          Client.save().then((resp) => {
            db.User.findOne({ _id: req.body.userId }, function(err, linkSentBy) {
              if (err) {
                res.send(err)
              }
              //  else if (linkSentBy == null) {

              //   // DATA NOT FOUND
              // }
              else {
                userAsClient.companyName = linkSentBy.companyName;
                userAsClient.address = linkSentBy.address;
                userAsClient.state = linkSentBy.state;
                userAsClient.city = linkSentBy.city;
                userAsClient.pincode = linkSentBy.pincode;
                userAsClient.email = linkSentBy.email;
                userAsClient.ownerName = linkSentBy.ownerName;
                userAsClient.mobile1 = linkSentBy.mobile1;
                userAsClient.mobile2 = linkSentBy.mobile2;
                userAsClient.landline = linkSentBy.landline;
                userAsClient.panNo = linkSentBy.panNo;
                userAsClient.GSTNo = linkSentBy.GSTNo;
                userAsClient.userId = repeatedUser._id;
                if (linkSentBy.password) {
                  userAsClient.password = Utils.md5(linkSentBy.password)
                }
                userAsClient.save().then((res) => {
                  res.send(res)
                }).catch((error) => {
                  res.send(error)
                })
              }
            })
          }).catch((error) => {
            res.send(error)
          })
        } else {
          User.save().then((response) => {
            finalId = response._id
            Client.save().then((resp) => {
              db.User.findOne({ _id: req.body.userId }, function(err, linkSentBy) {
                if (err) {
                  res.send(err)
                }
                //  else if (linkSentBy == null) {

                //   // DATA NOT FOUND
                // }
                else {
                  userAsClient.companyName = linkSentBy.companyName;
                  userAsClient.address = linkSentBy.address;
                  userAsClient.state = linkSentBy.state;
                  userAsClient.city = linkSentBy.city;
                  userAsClient.pincode = linkSentBy.pincode;
                  userAsClient.email = linkSentBy.email;
                  userAsClient.ownerName = linkSentBy.ownerName;
                  userAsClient.mobile1 = linkSentBy.mobile1;
                  userAsClient.mobile2 = linkSentBy.mobile2;
                  userAsClient.landline = linkSentBy.landline;
                  userAsClient.panNo = linkSentBy.panNo;
                  userAsClient.GSTNo = linkSentBy.GSTNo;
                  userAsClient.userId = finalId;
                  if (linkSentBy.password) {
                    userAsClient.password = Utils.md5(linkSentBy.password)
                  }
                  userAsClient.save().then((res) => {
                    res.send(res)
                  }).catch((error) => {
                    res.send(error)
                  })
                }
              })
            }).catch((error) => {
              res.send(error)
            })
          }).catch((error) => {
            res.send(error)
          })
        }
      })
    } else {
      Client.save().then((response) => {
        res.send(response)
      }).catch((err) => {
        res.send(err)
      })
    }

  };


  getClientsByUser(req, res) {
    let email = req.params.email;
    db.User.findOne({ email: email }, function(err, foundUser) {
      if (err) {
        res.send(err)
      } else {
        db.Client.find({ userId: foundUser._id }, function(err, clients) {
          if (err) {
            res.send(err);
          } else {
            clients.link = 'http://' + global.config.server.url + ':' + global.config.server.port + '/#/client/add/' + req.session.userProfile._id;
            res.send(clients)
          }
        });
      }

    });
  };

  getAllClient(req, res) {
    db.Client.find({}).then((response) => {
      res.send(response);
    }).catch((error) => {
      res.json(error);
    })
  }
}
