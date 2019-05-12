'use strict';

const { router, post, get } = require('microrouter');
const cors = require('micro-cors')();
const {
  authRoute,
  callbackRoute,
  notFoundRoute,
  notSupportedRoute,
} = require('./routes');

process.on('unhandledRejection', (reason, p) => {
  console.error(
    'Promise unhandledRejection: ',
    p,
    ', reason:',
    JSON.stringify(reason),
  );
});

module.exports = cors(
  router(
    post('/*', notSupportedRoute),
    get('/auth', authRoute),
    get('/auth/callback', callbackRoute),
    get('/*', notFoundRoute),
  ),
);
