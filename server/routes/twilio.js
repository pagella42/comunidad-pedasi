const express = require("express");
const router = express.Router();

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = "AC22a4dbe973584e2743f824203be078e0";
const authToken = "3bbfc79a9f5b7822f7b37faf8e27efb7";
const client = require("twilio")(accountSid, authToken);

router.post("/verifyPhoneNumber/send", async (req, res) => {
  let phoneNumber = req.body.phoneNumber;

  await client.verify
    .services("VAeaa633cf20ccfdddafd0960668ba5de8")
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
    .services("VAeaa633cf20ccfdddafd0960668ba5de8")
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
