module.exports = class ClientController {
  constructor(app) {
    app.get('/api/client', this.getAllClient);
    app.post('/api/client', this.insertNewClient);
    app.get('/api/client-by-user/:email', this.getClientsByUser)
  }

  insertNewClient(req, res) {
    let postbody = req.body;
    let client = new db.Client();
    client.companyName = postbody.companyName;
    client.address = postbody.address;
    client.state = postbody.state;
    client.city = postbody.city;
    client.pincode = postbody.pincode;
    client.email = postbody.email;
    client.ownerName = postbody.ownerName;
    client.mobile1 = postbody.mobile1;
    client.mobile2 = postbody.mobile2;
    client.landline = postbody.landline;
    client.panNo = postbody.panNo;
    client.tinNo = postbody.tinNo;
    client.GSTNo = postbody.GSTNo;
    client.userId = postbody.userId;
    client.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Client created!' });
      }
    });
  };

  getClientsByUser(req, res) {
    let email = req.params.email;

    console.log("email", email);
    db.User.findOne({ email: email }, function(err, foundUser) {
      if (err) {
        console.log("err", err);

        res.send(err)
      } else {

        console.log("foundUser", foundUser);
        db.Client.find({ userId: foundUser._id }, function(err, clients) {
          if (err) {
            res.error(err);
          } else {

            console.log("clients", clients);
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
