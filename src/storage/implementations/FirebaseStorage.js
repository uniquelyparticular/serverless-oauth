/* eslint-disable no-underscore-dangle */

'use strict';

const admin = require('firebase-admin');

const wrapKeyData = (keyData, keyType = 'RSA PRIVATE') => `-----BEGIN ${keyType} KEY-----${keyData.replace(
  // eslint-disable-next-line no-useless-escape
  /\"/g,
  '',
)}-----END ${keyType} KEY-----\n`.replace(/\\n/g, '\n');

const _firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: wrapKeyData(process.env.FIREBASE_PRIVATE_KEY, 'PRIVATE'),
  client_email: `${process.env.FIREBASE_SERVICE_ACCOUNT}@${
    process.env.FIREBASE_PROJECT_ID
  }.iam.gserviceaccount.com`,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${
    process.env.FIREBASE_SERVICE_ACCOUNT
  }%40${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
};

// console.log('process.env.FIREBASE_CLIENT_ID',process.env.FIREBASE_CLIENT_ID)
// console.log('process.env.FIREBASE_PROJECT_ID',process.env.FIREBASE_PROJECT_ID)
// console.log('process.env.FIREBASE_PRIVATE_KEY_ID',process.env.FIREBASE_PRIVATE_KEY_ID)
// console.log('process.env.FIREBASE_PRIVATE_KEY',process.env.FIREBASE_PRIVATE_KEY)
// console.log(`_firebaseConfig: ${JSON.stringify(_firebaseConfig)}`)

const { StorageProvider } = require('../interfaces/StorageProvider');

exports.FirebaseStorage = class FirebaseStorage extends StorageProvider {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(_firebaseConfig),
        databaseURL: `https://${_firebaseConfig.project_id}.firebaseio.com`,
      });
    }
    super(admin.firestore());
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
