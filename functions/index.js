const functions = require('firebase-functions');
const admin = require('firebase-admin');
var moment = require('moment');
const cors = require('cors')
const express = require('express');
const accountSid = functions.config().account.sid;
const authToken = functions.config().account.token;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.post('/addReservation/', (req, res) => { doAddReservation(req, res) });
// app.post('/addQuote/', (req, res) => { doAddQuote(req, res) });
// app.post('/handleIncoming/', (req, res) => { doHandleIncoming(req, res) });
// app.post('/logError/', (req, res) => { logError(req, res) });
// app.put('/:id', (req, res) => {//...});
// app.delete('/:id', (req, res) => {//...});

exports.api = functions.https.onRequest(app);

const twilioNumber = "+14152149825";

async function doAddReservation(req, res) {
  const { name, phoneNumber, dateTime, guid, carMake, carModel } = req.query;

  if (!name || !phoneNumber || !carMake || !carModel || !dateTime || !guid) {
    return res.status(400).json({
      type: 'AssertionError',
      message: 'Invalid request'
    });
  }

  const result = await admin.database().ref('/reservations').push({ name, phoneNumber, dateTime, guid, carMake, carModel });
  console.log("Push reservation, result: ", result);
  return res.status(200).json({ status: "success" });
}

exports.onReservationCreated = functions.database.ref('/reservations/{uid}').onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const reservation = snapshot.val();
  console.log('Got new reservation', context.params.uid, reservation);


  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.

  // return snapshot.ref.parent.child('uppercase').set(uppercase);
});

function sendMessage(to, body) {
  return client.messages
  .create({
    to,
    from: twilioNumber,
    body,
  })
  .then(message => console.log(message))
  .catch(err => console.log(err));
}

function getMessageBody(text) {
  return text + "\n\n" + getFooter();
}

function getFooter() {
  return `Powered by Gears Guru. Find the best prices on verified mechanics at https://gears.guru`;
}