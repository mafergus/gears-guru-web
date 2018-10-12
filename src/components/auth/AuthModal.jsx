import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'datastore/database';
import Dialog from '@material-ui/core/Dialog';
import { addUser, getPhoto, uploadFile, checkUserExists } from 'util/api';
import store from "datastore/store";

import { text } from 'util/colors';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class AuthModal extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  handleSignUpFacebook = () => {
    let userData = {};

    this.props.handleClose();
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");
    provider.addScope("public_profile");
    firebase.auth().signInWithPopup(provider)
    .then(result => { 
      const email = result.additionalUserInfo.profile.email;
      const fbUid = result.additionalUserInfo.profile.id;
      userData = {
        name: result.user.displayName,
        uid: result.user.uid,
        email,
        photo: result.user.photoURL,
        fbUid,
      };
      return userData;
    }).then(userData => checkUserExists(userData.uid))
    .catch(user => {
      store.dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user });
      firebase.onAuthSuccess(user.uid);
      throw new Error("User exists, logging in");
    })
    .then(() => fetch(userData.photo))
    .then(response => {
      if (response && response.ok) {
        return response.blob();
      }
    })
    .then(blob => {
      const storageRef = firebase.storage().ref('/users/' + userData.uid + "/profile_photo");
      return storageRef.put(blob);
    })
    .then(() => getPhoto())
    .then(blob => uploadFile(blob))
    .then(url => {
      userData.coverPhoto = url;
      store.dispatch(addUser(userData));
    })
    .catch(error => {
      if (error.code === "auth/account-exists-with-different-credential") {
        alert(error.message);
      }
    });
  }

  render() {
    const { title, isOpen, handleClose } = this.props;

    return (
      <Dialog
        style={{ padding: 20 }}
        onClose={handleClose}
        open={isOpen}>
        <div 
          style={{ 
            height: 200,
            width: 200,
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <span style={{ fontSize: "1.1em", fontWeight: 500, marginLeft: 15, marginTop: 10, marginBottom: 10, color: text.secondary.dark }}>{title}</span>
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
              className="facebookSignUpButton"
              onClick={this.handleSignUpFacebook}
            >
            </button>
          </div>
        </div>
      </Dialog>
    );
  }
}
