// var CONFIG = require('../config/mail-server-property.json');
module.exports = {
  MailFunction(emailObject, Email) {
    let q = require("q");
    let smtpTransport = require('nodemailer-smtp-transport');
    let nodemailer = require('nodemailer');
    let sendMail = (mailOptions) => {
      mailOptions.from = mailOptions.from || global.config.mailServer.fromAddress;
      mailOptions.to = Email;
      let deferred = q.defer();
      let smtpConfiguration = {
        host: global.config.mailServer.host,
        port: global.config.mailServer.port,
        secure: global.config.mailServer.secure,
        debug: global.config.mailServer.debug,
        auth: {
          user: global.config.mailServer.username,
          pass: global.config.mailServer.password
        }
      };
      let gstEmailTransporter = nodemailer.createTransport(smtpTransport(smtpConfiguration));
      gstEmailTransporter.sendMail(mailOptions, function(mailError, mailResponseStatus) {
        if (mailError) {
          deferred.reject(mailError);
        } else {
          deferred.resolve(true);
        }
      });
      return deferred.promise;
    };
    let emailOb = emailObject;
    sendMail(emailOb).then(function(mailDetail) {}).catch(function(sendEmailError) {
      console.log("error", sendEmailError);
    });
  }
}
