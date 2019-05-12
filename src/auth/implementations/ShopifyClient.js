/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

'use strict';

const { AuthProvider } = require('../interfaces/AuthProvider');

exports.ShopifyClient = class ShopifyClient extends AuthProvider {
  constructor() {
    const request = require('request-promise');
    super({
      request,
      deployed_uri: process.env.DEPLOYED_URI,
      shopify_key: process.env.SHOPIFY_API_KEY,
      shopify_scopes: process.env.SHOPIFY_OAUTH_SCOPES,
    });
  }

  _getSecureParam({
    params,
    paramName = 'shop',
    regexFilter = /\.myshopify\.com$/,
  }) {
    const paramVal = params[paramName];
    return paramVal && regexFilter.test(paramVal) ? paramVal : null;
  }

  _getAuthURL({ secureParam, state }) {
    return `https://${secureParam}/admin/oauth/authorize?client_id=${
      this.provider.shopify_key
    }&scope=${this.provider.shopify_scopes}&redirect_uri=${
      this.provider.deployed_uri
    }/auth/callback&state=${state}`;
  }

  _generateAccessToken({
    secureParam, apiKey, apiSecret, code, deployedURI,
  }) {
    const accessTokenRequestUrl = `https://${secureParam}/admin/oauth/access_token`;
    const accessTokenPayload = {
      grant_type: 'authorization_code',
      client_id: apiKey,
      client_secret: apiSecret,
      code,
      redirect_uri: `${deployedURI}/auth/callback`,
    };
    return this.provider.request.post(accessTokenRequestUrl, {
      json: accessTokenPayload,
    });
  }
};
