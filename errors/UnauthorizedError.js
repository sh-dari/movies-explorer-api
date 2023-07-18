const { ERROR_CODE_UNAUTHORIZED } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = ERROR_CODE_UNAUTHORIZED;
  }
};
