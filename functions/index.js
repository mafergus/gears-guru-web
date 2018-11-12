// serviceAccount = require('./serviceAccount.json');

const admin = require('firebase-admin');
// const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
// adminConfig.credential = admin.credential.cert(serviceAccount);

const functions = require('firebase-functions');
const loadjs = require('loadjs');
var moment = require('moment');
const cors = require('cors')
const express = require('express');
const accountSid = functions.config().account.sid;
const authToken = functions.config().account.token;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// admin.initializeApp(adminConfig);

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.post('/addReservation/', (req, res) => doAddReservation(req, res));
app.get('/populateGarages', (req, res) => populateGarages);
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
  // console.log("Push reservation, result: ", result);
  return res.status(200).json({ status: "success" });
}

exports.onReservationCreated = functions.database.ref('/reservations/{uid}').onCreate(async (snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const reservation = snapshot.val();
  console.log('Got new reservation', context.params.uid, reservation);

  const garageSnap = await admin.database().ref('/garages/' + reservation.guid).once('value');
  const garage = garageSnap.val();
  const carMakeSnap = await admin.database().ref('/cars/cars/' + reservation.carMake).once('value');
  const carMake = carMakeSnap.val();
  console.log("Got car make: ", carMake);
  const carModel = carMake.models.find(item => item.uid === reservation.carModel);
  console.log("Got car model: ", carModel);

  console.log('For garage: ', garage);

  const date = moment(reservation.dateTime).format('MMMM Do');
  const time = moment(reservation.dateTime).format('h:mma');
  const customerMsg = `${reservation.name}, your appointment at ${garage.name} is confirmed for ${time} on ${date}. Reply to this message to communicate directly with the mechanic.`;
  const promises = [];
  promises.push(sendMessage(reservation.phoneNumber, customerMsg));

  if (garage.hasOwnProperty('international_phone_number')) {
    const garageMsg = `Congratulations! You have a new appointment, ${reservation.name} is confirmed for ${time} on ${date}. Their car is a ${carMake.make} ${carModel.name}. Reply to this message to communicate with them directly.`;
    promises.push(sendMessage('+16507961513', garageMsg));
  }

  return Promise.all(promises);
});


async function populateGarages(req, res) {

  function getPlaces(places) {
    return places.map(place => {
      const { name, place_id, geometry } = place;
      return {
        name,
        place_id,
        location: geometry.location,
      };
    });
  }

  const AL_QUOZ_LOCATION = [25.134415, 55.245258];

  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDsjdI2R4TNd9bpKcHtVMI6qthrV44C8IY',
    Promise: Promise
  });
  
  let response = await googleMapsClient.placesNearby({
    language: 'en',
    location: [AL_QUOZ_LOCATION[0], AL_QUOZ_LOCATION[1]],
    radius: 5000,
    type: 'car_repair'
  })
  .asPromise();

  let places = getPlaces(response.json.results);
  doAddPlaces(places);

  return addPlacesRecursive(response);
}

async function addPlacesRecursive(response) {
  if (response.json.status === 'INVALID_REQUEST') { return; }

  response = await googleMapsClient.places({
    pagetoken: response.json.next_page_token
  })
  .asPromise();

  let places = getPlaces(response.json.results);
  doAddPlaces(places);

  addPlacesRecursive(response);
}

async function doAddPlaces(places) {
  const placePromises = places.map(place => {
    const key = admin.database().ref('/garages').push().key;
    return admin.database().ref('/garages' + key).update(place);
  });

  const retVals = await Promise.all(placePromises);

  return;
}

exports.populateGarages = populateGarages;

function sendMessage(to, body) {
  return client.messages
    .create({
      to,
      from: twilioNumber,
      body,
    });
}

function getMessageBody(text) {
  return text + "\n\n" + getFooter();
}

function getFooter() {
  return `Powered by Gears Guru. Find the best prices on verified mechanics at https://gears.guru`;
}