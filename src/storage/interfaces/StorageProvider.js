/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

exports.StorageProvider = class StorageProvider {
  setup() {
    return new Promise((resolve, reject) => {
      try {
        return this._setup()
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  storeValue(secureParam, nonce) {
    return new Promise((resolve, reject) => {
      try {
        return this._storeValue(secureParam, nonce)
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  retrieveValue(secureParam, nonce) {
    return new Promise((resolve, reject) => {
      try {
        return this._retrieveValue(secureParam, nonce)
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  removeValue(secureParam) {
    return new Promise((resolve, reject) => {
      try {
        return this._removeValue(secureParam)
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // INTERFACE IMPLEMENTATIONS

  _setup(...args) {
    throw new Error("StorageProvider._setup undefined");
  }

  _storeValue(...args) {
    throw new Error("StorageProvider._storeValue undefined");
  }

  _retrieveValue(...args) {
    throw new Error("StorageProvider._retrieveValue undefined");
  }

  _removeValue(...args) {
    throw new Error("StorageProvider._removeValue undefined");
  }
};
