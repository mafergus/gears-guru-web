import firebase from 'firebase';
import store from "datastore/store";

firebase.init = () => {

  const config = {
    apiKey: "AIzaSyC-PryPlz5CVsratD20eV7iB9gM76JY8Uw",
    authDomain: "gears-guru-991bc.firebaseapp.com",
    databaseURL: "https://gears-guru-991bc.firebaseio.com",
    projectId: "gears-guru-991bc",
    storageBucket: "gears-guru-991bc.appspot.com",
    messagingSenderId: "292156830551"
  };

  firebase.initializeApp(config);

  firebase.database().ref('garages').on('value', snapshot => {
    if (snapshot.exists()) {
      const garages = snapshot.val();
      if (garages) {
        store.dispatch({ type: "GET_GARAGES_SUCCESS", garages });
      }
    }
  });

  firebase.database().ref('categories').on('value', snapshot => {
    if (snapshot.exists()) {
      const categories = snapshot.val();
      if (categories) {
        store.dispatch({ type: "GET_CATEGORIES_SUCCESS", categories });
      }
    }
  });

  firebase.database().ref('lists').on('value', snapshot => {
    if (snapshot.exists()) {
      const lists = snapshot.val();
      if (lists) {
        store.dispatch({ type: "GET_LISTS_SUCCESS", lists });
      }
    }
  });

  firebase.database().ref('feeds').on('value', snapshot => {
    const feeds = snapshot.val();
    if (feeds) {
      store.dispatch({ type: "GET_FEEDS_SUCCESS", feeds });
    }
  });

  // firebase.database().ref('users').on('value', snapshot => {
  //   const users = snapshot.val();
  //   if (users) {
  //     store.dispatch({ type: "GET_USERS_SUCCESS", users });
  //   }
  // });

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("Got user! ", user);
      const authedUser = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
      };
      store.dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user: authedUser });
    } else {
      // No user is signed in.
    }
  });

  firebase.onAuthSuccess = (userId) => {
    if (!userId) { return; }
    firebase.database().ref("/users/" + userId).on('value', snapshot => {
      const user = snapshot.val();
      if (user) {
        store.dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user });
      }
    });
  };
  
}

export default firebase;