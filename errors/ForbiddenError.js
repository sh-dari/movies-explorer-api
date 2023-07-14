const { ERROR_CODE_FORBIDDEN } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = ERROR_CODE_FORBIDDEN;
  }
};
