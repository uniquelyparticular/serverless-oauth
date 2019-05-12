'use strict';

const { send } = require('micro');

exports.notFoundRoute = async (req, res) => send(res, 404, { error: 'Route not found' });

exports.notSupportedRoute = async (req, res) => send(res, 405, { error: 'Method not supported' });
