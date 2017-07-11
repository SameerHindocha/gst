const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'a46c0cb6',
  apiSecret: '92dab54f2e1fc3e2'
});

nexmo.message.sendSms(
  '+919824957260', '+919737300583', 'yo',
  (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      console.log(responseData);
    }
  }
);
