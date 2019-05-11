/* eslint-disable no-underscore-dangle */

'use strict';

const { FirebaseStore } = require('./firebase');

exports.Storage = class Storage {
  constructor() {
    // perform logic on which store to choose here
    this._store = new FirebaseStore();
  }

  get store() {
    return this._store;
  }
};
