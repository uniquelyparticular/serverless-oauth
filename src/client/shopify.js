/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

"use strict";

const request = require("request-promise");

const { ClientProvider } = require("./interfaces/ClientProvider");

exports.ShopifyClient = class ShopifyClient extends ClientProvider {
  _getSecureParam({
    params,
    paramName = "shop",
    regexFilter = /\.myshopify\.com$/
  }) {
    const paramVal = params[paramName];
    return paramVal && regexFilter.test(paramVal) ? paramVal : null;
  }

  _getAuthURL({ secureParam, state }) {
    const client = process.env.SHOPIFY_API_KEY;
    const scopes = process.env.SHOPIFY_OAUTH_SCOPES;
    const uri = process.env.DEPLOYED_URI;
    return `https://${secureParam}/admin/oauth/authorize?client_id=${client}&scope=${scopes}&redirect_uri=${uri}/auth/callback&state=${state}`;
  }

  _generateAccessToken({ secureParam, apiKey, apiSecret, code, deployedURI }) {
    const accessTokenRequestUrl = `https://${secureParam}/admin/oauth/access_token`;
    const accessTokenPayload = {
      grant_type: "authorization_code",
      client_id: apiKey,
      client_secret: apiSecret,
      code,
      redirect_uri: `${deployedURI}/auth/callback`
    };
    return request.post(accessTokenRequestUrl, { json: accessTokenPayload });
  }
};
