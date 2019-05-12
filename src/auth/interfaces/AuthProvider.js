/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

exports.AuthProvider = class AuthProvider {
  constructor(authProvider) {
    if (!authProvider) {
      throw new Error('Missing AuthProvider client in constructor');
    }
    this.provider = authProvider;
    // console.log('AuthProvider.provider', this.provider);
  }

  getSecureParam({ params, paramName, regexFilter }) {
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

  getAuthURL({ secureParam, state }) {
    try {
      return this._getAuthURL({
        secureParam,
        state,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  generateAccessToken({
    secureParam, apiKey, apiSecret, code, deployedURI,
  }) {
    return new Promise((resolve, reject) => {
      try {
        return this._generateAccessToken({
          secureParam,
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
    throw new Error('AuthProvider._getSecureParam undefined');
  }

  _getAuthURL(...args) {
    throw new Error('AuthProvider._getAuthURL undefined');
  }

  _generateAccessToken(...args) {
    throw new Error('AuthProvider._generateAccessToken undefined');
  }
};
