/* eslint-disable no-underscore-dangle */

'use strict';

const { FirebaseStorage } = require('./implementations/FirebaseStorage');

exports.Storage = class Storage {
  constructor() {
    // TODO: perform logic on which StorageProvider to choose here
    this._provider = new FirebaseStorage();
  }

  get provider() {
    return this._provider;
  }
};
