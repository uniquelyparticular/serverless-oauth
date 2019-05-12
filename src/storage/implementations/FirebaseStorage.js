/* eslint-disable no-underscore-dangle */

'use strict';

const firebase = require('firebase');
require('firebase/firestore');

const { StorageProvider } = require('../interfaces/StorageProvider');

exports.FirebaseStorage = class FirebaseStorage extends StorageProvider {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    }
    super(firebase.firestore());
  }

  _storeValue(secureParam, nonce) {
    return this.provider
      .collection('OAuth')
      .doc(secureParam)
      .set({ nonce });
  }

  _retrieveValue(secureParam, nonce) {
    return this.provider
      .collection('OAuth')
      .doc(secureParam)
      .get()
      .then((previousState) => {
        if (Number(nonce) !== previousState.data().nonce) {
          throw new Error('Request origin cannot be verified');
        }
        return this.removeValue(secureParam);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  _removeValue(secureParam) {
    return this.provider
      .collection('OAuth')
      .doc(secureParam)
      .delete()
      .catch((error) => {
        throw new Error(error);
      });
  }

  set store(newStore) {
    this._store = newStore;
  }

  get store() {
    return this._store;
  }
};
