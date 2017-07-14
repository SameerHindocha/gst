let SendMail = require("../../helpers/send-mail.js");
let SendSMS = require("../../helpers/send-sms.js");
let request = require('request');

module.exports = class ShareFormController {
  constructor(app) {
    app.get('/admin-api/share-form/:email', this.sendMail);
    app.get('/admin-api/send-sms/:email', this.sendSMS);
    // app.get('/admin-api/share-link/:email', this.shareLink);

  }

  sendMail(req, res) {
    let emailObj = {
      subject: `Welcome to GST registration ${req.session.userProfile.ownerName}`, // Subject line
      html: `<h4>Hello, ${req.session.userProfile.ownerName}</h4>
                    <h4>Welcome,</h4><br>
                    <a href='${global.preLink}/${req.session.userProfile._id}' class='alert-link'>Click here to fill the GST registration form</a></br></br>
                    <h4>Warm Regards,<h4>
                    <h4>GST team</h4>`,
    };
    SendMail.MailFunction(emailObj, req.session.userProfile.email).then(function(data) {
      res.send({ message: "Email has been sent successfully to your registered mail" })
    }, function(err) {
      res.send(err)
    });
  };
  sendSMS(req, res) {
    let msg = 'We' + req.session.userProfile.companyName + 'request you to fill your Company DETAILS with GSTIN ,WHICH WILL BE NEEDED ( WITHOUT SPELLING ERROR) . WE HUMBALLY REQUEST TO FILL UP THIS FORM AND SUBMIT IT AS EARLY AS POSSIBLE TO UPDATE YOUR DETAILS WITH OUR Company.' +
      'PLEASE CLICK ON THE FOLLOWING LINK TO UPDATE YOUR DETAILS :   http://localhost:8020/#/client/add'
      //http://' + global.config.server.url + ':' +
      // global.config.server.port + '/#/client/add/' + req.session.userProfile._id
    let data = {
      mobile: req.session.userProfile.mobile1,
      message: msg
    }
    console.log("msg", msg);
    SendSMS.SMSFunction(data);
  };


}
