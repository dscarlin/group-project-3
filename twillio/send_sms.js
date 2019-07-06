// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACba635bef34bd665e3a5524406f0e3e7a';
const authToken = '17790cecb9f4cc480463f81f086b6d1f';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+19195253220',
     to: '+12526462642'
   })
  .then(message => console.log(message.sid));
