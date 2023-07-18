const { ERROR_CODE_VALIDATION } = require('../utils/constants');

module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = ERROR_CODE_VALIDATION;
  }
};
