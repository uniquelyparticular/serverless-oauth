'use strict';

const crypto = require('crypto');
const querystring = require('querystring');

exports.toJSON = error => (!error
  ? ''
  : Object.getOwnPropertyNames(error).reduce(
    (jsonError, key) => ({ ...jsonError, [key]: error[key] }),
    { type: 'error' },
  ));

exports.proccessHmac = ({ req, hmac, apiSecret }) => new Promise((resolve, reject) => {
  const params = {};
  Object.keys(req.query)
    .sort()
    .forEach((key) => {
      params[key] = req.query[key];
    });
  delete params.signature;
  delete params.hmac;
  const message = querystring.stringify(params);
  const providedHmac = Buffer.from(hmac, 'utf-8');
  const generatedHash = Buffer.from(
    crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex'),
    'utf-8',
  );
  let hashEqual = false;
  try {
    hashEqual = crypto.timingSafeEqual(generatedHash, providedHmac);
  } catch (e) {
    hashEqual = false;
  }
  if (!hashEqual) {
    reject(new Error('HMAC validation failed'));
  }
  resolve(true);
});
