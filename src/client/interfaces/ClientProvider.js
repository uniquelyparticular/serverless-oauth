/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

exports.ClientProvider = class ClientProvider {
  getSecureParam({
    params,
    paramName,
    regexFilter,
  }) {
    try {
      return this._getSecureParam({
        params,
        paramName,
        regexFilter,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  getAuthURL({
    shop,
    state,
  }) {
    try {
      return this._getAuthURL({
        shop,
        state,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  generateAccessToken({
    shop,
    apiKey,
    apiSecret,
    code,
    deployedURI,
  }) {
    return new Promise((resolve, reject) => {
      try {
        return this._generateAccessToken({
          shop,
          apiKey,
          apiSecret,
          code,
          deployedURI,
        })
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // INTERFACE IMPLEMENTATIONS

  _getSecureParam(...args) {
    throw new Error('ClientProvider._getSecureParam undefined');
  }

  _getAuthURL(...args) {
    throw new Error('ClientProvider._getAuthURL undefined');
  }

  _generateAccessToken(...args) {
    throw new Error('ClientProvider._generateAccessToken undefined');
  }
};
