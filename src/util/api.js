import firebase from 'datastore/database';
import store from 'datastore/store';

import { AL_QUOZ_LOCATION } from 'util/constants';

const PLACEHOLDER_PHOTO = "https://s-media-cache-ak0.pinimg.com/originals/96/bb/de/96bbdef0373c7e8e7899c01ae11aee91.jpg";
const PIXABAY_KEY = "4423887-ab96e540ffbe404d644032133";
const API_BASE = "https://us-central1-gears-guru-991bc.cloudfunctions.net";

export function addReviewMessage(reviewId, userId, message, timestamp) {
  const messageData = {
    message,
    userId,
    timestamp,
  };
  const newReviewItemKey = firebase.database().ref(`reviews/${reviewId}`).push().key;
  const updates = {};
  updates[`reviews/${reviewId}/` + newReviewItemKey] = messageData;

  return firebase.database().ref().update(updates);
}

export function addReviewMessageReply(reviewId, reviewItemId, userId, message, timestamp) {
  const url = `reviews/${reviewId}/${reviewItemId}/replies/`;
  const messageData = {
    message,
    userId,
    timestamp,
  };
  const newReviewItemKey = firebase.database().ref(url).push().key;
  const updates = {};
  updates[url + newReviewItemKey] = messageData;

  return firebase.database().ref().update(updates);
}

export function addUser(user) {
  return dispatch => {
    if (Object.keys(user).length === 0) { return dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user }); }

    const updates = {};
    updates["users/" + user.uid + "/name"] = user.name;
    updates["users/" + user.uid + "/uid"] = user.uid;
    updates["users/" + user.uid + "/email"] = user.email;
    updates["users/" + user.uid + "/photo"] = user.photo;
    updates["users/" + user.uid + "/fbUid"] = user.fbUid;
    updates["users/" + user.uid + "/birthday"] = user.birthday || "";
    updates["users/" + user.uid + "/hometown"] = user.hometown || "";
    updates["users/" + user.uid + "/location"] = user.location || "";
    updates["users/" + user.uid + "/coverPhoto"] = user.coverPhoto || PLACEHOLDER_PHOTO;

    firebase.database().ref().update(updates).then(() => {
      dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user });
      firebase.onAuthSuccess(user.uid);
    });
  };
}

export async function addReservation(reservation) {

  const opts = Object.entries(reservation).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
  const response = await fetch(`${API_BASE}/api/addReservation?${opts}`, { method: 'post' })
  
  if (!response.ok) {
    console.log("Error adding reservation");
  }  
}

export async function getCars() {
  const snap = await firebase.database().ref('/cars/cars').once('value');
  return snap.val();
}

export function getPhoto(searchTerm) {
  return new Promise((resolve, reject) => {
    getPhotoUrl(searchTerm)
    .then(url => fetch(url))
    .then(response => {
      if (response && response.ok) {
        return response.blob();
      }
      reject(new Error(response.statusText));
    }).then(blob => resolve(blob))
    .catch(error => reject(error));
  });
}

export function getPhotoUrl(searchTerm, isThumbnail=false) {
  const photoParam = searchTerm ? `&q=${searchTerm}` : "";
  return new Promise((resolve, reject) => {
    fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}${photoParam}&image_type=photo`).then(response => {
      if (response.ok) {
        return response.json();
      }
      reject(new Error(response.statusText));
    }).then(json => {
      if (json && json.hits && json.hits.length > 0) {
        const urlType = isThumbnail ? "previewURL" : "webformatURL";
        const url = searchTerm ? 
          json.hits[0][urlType] : 
          json.hits[getRandomInt(0, json.hits.length)][urlType];
        resolve(url);
      } else {
        reject(new Error("Fuck this shiet"));
      }
    }).catch(error => resolve(error));
  });
}

// export async function getGPlaces() {
//   debugger;

//   if (typeof google === "undefined") { return; }

//   const mapCenter = new google.maps.LatLng(AL_QUOZ_LOCATION[0], AL_QUOZ_LOCATION[1]); //eslint-disable-line

//   const snapshot = await firebase.database().ref('/garages').once('value');

//   const garages = snapshot.val();
//   if (!garages) { return; }
//   store.dispatch({ type: "GET_GARAGES_SUCCESS", garages });

//   debugger;

//   const map = new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
//     center: mapCenter,
//     zoom: 12
//   });
//   const service = new google.maps.places.PlacesService(map); //eslint-disable-line

//   Object.entries(garages).filter(entry => entry[1].place_id).forEach(entry => {
//     const [ key, obj ] = entry;
//     try {
//       service.getDetails({ placeId: obj.place_id }, (place, status) => {
//         debugger;
//         if (status === google.maps.places.PlacesServiceStatus.OK) { //eslint-disable-line
//           store.dispatch({ type: "GET_GARAGE_SUCCESS", garage: { ...place, key } });
//         }
//       });
//     } catch (error) {
//       debugger;
//       console.log(error);
//     }
//   });
// }

export function uploadFile(file, directory="images/") {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();
    // Create the file metadata
    const metadata = {
      contentType: file.hasOwnProperty("type") ? file.type : "image/jpeg",
    };

    const uploadTask = storageRef.child(directory + new Date().getTime()).put(file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      null,
      error => reject(error),
      () => resolve(uploadTask.snapshot.downloadURL)
    );
  });
}

export function checkUserExists(uid) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`/users/${uid}`).once('value', snapshot => {
      const user = snapshot.val();
      if (user) {
        reject(user);
      } else {
        resolve(user);
      }
    });
  });
}

export function signOut() {
  firebase.auth().signOut()
  .then(() => store.dispatch({ type: "SIGN_OUT_USER" }))
  .catch(error => console.log("Error! ", error));
}

export function fetchGarage(garageId) {
  return firebase.database().ref('/garages/' + garageId).once('value')
  .then(snapshot => {
    if (snapshot.exists()) {
      const garage = snapshot.val();
      return garage;
    }
  })
  .catch(error => {
    console.log("Error fecthing garage: ", error);
  });
}

export function fetchCustomers(garageId) {
  return firebase.database().ref("/garages/" + garageId + "/customers").once("value")
  .then(snapshot => {
    console.log("Snapshot: ", snapshot);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  })
  .then(customers => {
    Object.keys(customers).forEach(key => {
      firebase.database().ref('customers/' + key).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("Got key: ", key);
          console.log("Got customer: ", snapshot.val());
          store.dispatch({ type: "ADD_CUSTOMER", customer: snapshot.val(), id: key });
        }
      })
      .catch(error => console.log("Error adding customer: ", error));
    });
  })
  .catch(error => {
    console.log("Error fetching customers: ", error);
  });
}

function getRandomInt(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}
