var SendMail = require("../../helpers/send-mail.js");

let request = require('request');

module.exports = class ShareFormController {
  constructor(app) {
    app.get('/admin-api/share-form/:email', this.sendMail);
    app.get('/admin-api/send-sms/:email', this.sendSMS);

  }



  sendMail(req, res) {
    let email = req.params.email;
    db.User.findOne({ email: email }, function(err, user) {
      if (err) {
        res.send(err);
      } else {
        let emailObj = {
          subject: `Welcome to GST registration ${user.ownerName} ${user._id}`, // Subject line
          html: `<h4>Hello, ${user.ownerName}</h4> 
                    <h4>Welcome,</h4><br>
                    <a href='http://${global.config.server.url}:${global.config.server.port}/#/client/add/${user._id}' class='alert-link'>Click here to fill the GST registration form</a></br></br>
<h4>Warm Regards,<h4>
                    <h4>GST team</h4>`,
        };
        SendMail.MailFunction(emailObj, email);
      }
    });
  };

  sendSMS(req, res) {
    let email = req.params.email;
    // let user = new db.User();
    const userId = "2000144979";
    const password = "etXCalqSL";
    db.User.findOne({ email: email }, function(err, user) {
      if (err) {
        res.send(err);
      } else {
        let mobile = user.mobile1;
        let msg = "Hello " + user.ownerName + ", Welcome to GST Registration111";
        request('http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=' + mobile + '&msg=' + msg + '&msg_type=TEXT&userid=' + userId + '&auth_scheme=plain&password=' + password + '&v=1.1&format=text', function(error, response, body) {
          if (error) {
            console.log('ERROR body:', body);
            res.send(error);
          } else {
            console.log('SUCCESS body:', body);
            res.send(response);
          }
        });
      }
    });
  };

}
