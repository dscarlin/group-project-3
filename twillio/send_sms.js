require("dotenv").config()
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

function sendMessage(applicantNumber, message) {

  const accountSid = 'ACba635bef34bd665e3a5524406f0e3e7a';
  const authToken = process.env.authToken;
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: '+19195253220',
      to: applicantNumber
    })
    .then(message => console.log(message.sid));
}
module.exports = sendMessage; 