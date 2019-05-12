/* eslint-disable no-underscore-dangle */

'use strict';

const { ShopifyClient } = require('./shopify');

exports.Client = class Client {
  constructor() {
    // perform logic on which store to choose here
    this._client = new ShopifyClient();
  }

  get client() {
    return this._client;
  }
};
