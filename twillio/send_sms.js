require("dotenv").config()
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

function sendMessage(applicantNumber, message) {

  // const accountSid = 'ACba635bef34bd665e3a5524406f0e3e7a';
  const accountSid = process.env.accountSid || 'ACf7753b95fce13247e85dfe08274000b5';
  const authToken = process.env.authToken;
  const client = require('twilio')(accountSid, authToken);
  console.log("function");
  console.log("acct ",process.env.accountSid )
  console.log("auth ",process.env.authToken )
  console.log("appNum ", applicantNumber)
  console.log("mess: ",message)

  client.messages
    .create({
      body: message,
      from: process.env.NUMBER || '+19199481344',
      to: applicantNumber
    })
    .then(message => console.log(message.sid));
}
module.exports = sendMessage; 