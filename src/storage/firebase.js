/* eslint-disable no-underscore-dangle */

'use strict';

const firebase = require('firebase');
require('firebase/firestore');

const { StorageProvider } = require('./interfaces/StorageProvider');

exports.FirebaseStore = class FirebaseStore extends StorageProvider {
  _setup() {
    const _this = this;
    return new Promise((resolve, reject) => {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
            projectId: process.env.FIREBASE_PROJECT_ID,
          });
        }
        _this.store = firebase.firestore();
        resolve(true);
      } catch (err) {
        reject(new Error(err));
      }
    });
  }

  _storeValue(shop, nonce) {
    return this.store
      .collection('OAuth')
      .doc(shop)
      .set({ nonce });
  }

  _retreiveValue(shop, nonce) {
    return this.store
      .collection('OAuth')
      .doc(shop)
      .get()
      .then((previousState) => {
        if (Number(nonce) !== previousState.data().nonce) {
          throw new Error('Request origin cannot be verified');
        }
        return this.removeValue(shop);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  _removeValue(shop) {
    return this.store
      .collection('OAuth')
      .doc(shop)
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
