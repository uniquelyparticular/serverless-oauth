/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

exports.StorageProvider = class StorageProvider {
  // constructor() {
  //   if (!this.store) {
  //     throw new Error('Must have a store!');
  //   }
  // }

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

  storeValue(shop, nonce) {
    return new Promise((resolve, reject) => {
      try {
        return this._storeValue(shop, nonce)
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  retreiveValue(shop, nonce) {
    return new Promise((resolve, reject) => {
      try {
        return this._retreiveValue(shop, nonce)
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  removeValue(shop) {
    return new Promise((resolve, reject) => {
      try {
        return this._removeValue(shop)
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // INTERFACE IMPLEMENTATIONS

  _setup(...args) {
    throw new Error('StorageProvider._setup undefined');
  }

  _storeValue(...args) {
    throw new Error('StorageProvider._storeValue undefined');
  }

  _retreiveValue(...args) {
    throw new Error('StorageProvider._retreiveValue undefined');
  }

  _removeValue(...args) {
    throw new Error('StorageProvider._removeValue undefined');
  }
};
