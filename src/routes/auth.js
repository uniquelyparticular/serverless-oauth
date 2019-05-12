'use strict';

const { send } = require('micro');
const redirect = require('micro-redirect');
const nonce = require('nonce')();
const { toJSON } = require('../utils');
const { Auth } = require('../auth');
const { Storage } = require('../storage');

exports.route = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 204);
  }

  try {
    const { hmac } = req.query;
    const { provider: storage } = new Storage();
    const { provider: auth } = new Auth();

    if (!hmac) {
      return send(res, 403, {
        error: 'Missing hmac parameter',
      });
    }
    const secureParam = auth.getSecureParam({
      params: req.query,
    });
    if (secureParam) {
      const state = nonce();
      return storage
        .storeValue(secureParam, state)
        .then(() => redirect(res, 302, auth.getAuthURL({ secureParam, state })))
        .catch((error) => {
          const jsonError = toJSON(error);
          return send(res, error.statusCode || 500, jsonError);
        });
    }
    return send(res, 403, {
      error: 'Missing parameter. Please add appropriate params to your request',
    });
  } catch (error) {
    const jsonError = toJSON(error);
    return send(res, error.statusCode || 500, jsonError);
  }
};
