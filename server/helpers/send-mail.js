var CONFIG = require('../config/mail-server-property.json');
module.exports = {
    MailFunction(emailObject, Email) {
        let q = require("q");
        let smtpTransport = require('nodemailer-smtp-transport');
        let nodemailer = require('nodemailer');
        let sendMail = (mailOptions) => {
            mailOptions.from = mailOptions.from || CONFIG.mailServer.fromAddress;
            mailOptions.to = Email;
            let deferred = q.defer();
            let smtpConfiguration = {
                host: CONFIG.mailServer.host,
                port: CONFIG.mailServer.port,
                secure: CONFIG.mailServer.secure,
                debug: CONFIG.mailServer.debug,
                auth: {
                    user: CONFIG.mailServer.username,
                    pass: CONFIG.mailServer.password
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
