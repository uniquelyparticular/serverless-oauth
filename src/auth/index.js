/* eslint-disable no-underscore-dangle */

'use strict';

const { ShopifyClient } = require('./implementations/ShopifyClient');

exports.Auth = class Auth {
  constructor() {
    // TODO: perform logic on which AuthProvider to choose here
    this._provider = new ShopifyClient();
  }

  get provider() {
    return this._provider;
  }
};
