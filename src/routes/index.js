'use strict';

const { route: authRoute } = require('./auth');
const { route: callbackRoute } = require('./callback');
const { notFoundRoute, notSupportedRoute } = require('./error');

module.exports = {
  authRoute,
  callbackRoute,
  notFoundRoute,
  notSupportedRoute,
};
