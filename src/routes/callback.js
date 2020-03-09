'use strict';

const { send } = require('micro');
const { toJSON, proccessHmac } = require('../utils');
const { Storage } = require('../storage');
const { Auth } = require('../auth');
const accessTokenView = require('../view/accessToken');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const deployedURI = process.env.DEPLOYED_URI;

// eslint-disable-next-line consistent-return
exports.route = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 204);
  }

  try {
    const { hmac, code, state } = req.query;
    const { provider: storage } = new Storage();
    const { provider: auth } = new Auth();

    const secureParam = auth.getSecureParam({
      params: req.query,
    });
    if (secureParam && hmac && code && state) {
      const credentials = await storage
        .retrieveValue(secureParam, state)
        .then(() => proccessHmac({
          req,
          hmac,
          apiSecret,
        }))
        .then((validHmac) => {
          if (validHmac) {
            return auth.generateAccessToken({
              secureParam,
              apiKey,
              apiSecret,
              code,
              deployedURI,
            });
          }
          return {};
        })
        .then(token => token);

      if (credentials.access_token) {
        // return send(res, 200, credentials);
        return send(res, 200, accessTokenView(credentials));
      }
      return send(res, 400, { error: 'Unable to validate2' });
    }
    return send(res, 400, { error: 'Required parameters missing' });
  } catch (error) {
    const jsonError = toJSON(error);
    return send(res, error.statusCode || 500, jsonError);
  }
};
