import firebase from 'datastore/database';

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