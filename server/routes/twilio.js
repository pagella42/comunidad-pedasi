const express = require("express");
const router = express.Router();

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = "NULL";
const authToken = "NULL";
const client = require("twilio")(accountSid, authToken);
//CREDENTIALS REMOVED FOR SECURITY

router.post("/verifyPhoneNumber/send", async (req, res) => {
  let phoneNumber = req.body.phoneNumber;

  await client.verify
    .services("NULL")
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then(verification => {
      console.log(
        `verification sent to ${phoneNumber}, and is ${verification.status}`
      );
      res.send(verification.status);
    });
});

router.post("/verifyPhoneNumber/verify", async (req, res) => {
  let phoneNumber = req.body.phoneNumber;
  let code = req.body.code;
  await client.verify
    .services("NULL")
    .verificationChecks.create({ to: phoneNumber, code: code })
    .then(verification_check => {
      console.log(
        verification_check.valid
          ? "Code entered is valid"
          : "Code entered is invalid"
      );
      res.send(verification_check.valid);
    });
});

module.exports = router;
