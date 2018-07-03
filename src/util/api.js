import firebase from 'datastore/database';

const PLACEHOLDER_PHOTO = "https://s-media-cache-ak0.pinimg.com/originals/96/bb/de/96bbdef0373c7e8e7899c01ae11aee91.jpg";
const PIXABAY_KEY = "4423887-ab96e540ffbe404d644032133";

export function addFeedMessage(feedId, userId, message, timestamp) {
  const messageData = {
    message,
    userId,
    timestamp,
  };
  const newFeedItemKey = firebase.database().ref(`feeds/${feedId}`).push().key;
  const updates = {};
  updates[`feeds/${feedId}/` + newFeedItemKey] = messageData;

  return firebase.database().ref().update(updates);
}

export function addFeedMessageReply(feedId, feedItemId, userId, message, timestamp) {
  const url = `feeds/${feedId}/${feedItemId}/replies/`;
  const messageData = {
    message,
    userId,
    timestamp,
  };
  const newFeedItemKey = firebase.database().ref(url).push().key;
  const updates = {};
  updates[url + newFeedItemKey] = messageData;

  return firebase.database().ref().update(updates);
}

export function addUser(user) {
  return dispatch => {
    if (Object.keys(user).length === 0) { return dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user }); }

    // debugger;
    
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

function getRandomInt(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}
