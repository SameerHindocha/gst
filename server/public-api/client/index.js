module.exports = class ClientController {
  constructor(app) {
    app.get('/api/client', this.getAllClient);
    app.post('/api/client', this.insertNewClient);
  }

  insertNewClient(req, res) {
    let postbody = req.body,
      client = new db.Client();
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
    client.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Client created!' });
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
